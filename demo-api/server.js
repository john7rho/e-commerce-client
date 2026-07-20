#!/usr/bin/env node
/**
 * Zero-dependency mock backend for the BofA / Devin Angular demo.
 * Matches the client's HttpClientService URL shape: {baseUrl}/{controller}/{action?}/{id?}
 *
 * Happy paths:
 *   1) GET  /api/products?page=&size=  → storefront product list
 *   2) POST /api/auth/login           → demo / demo → JWT for admin routes
 *
 * Also stubs: refresh/social login, register, storage URL, product CRUD shapes.
 *
 * Usage: node demo-api/server.js
 * Env:   PORT=3333
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 3333);
const FIXTURES = path.join(__dirname, 'fixtures', 'products.json');

/** @type {Array<any>} */
let products = JSON.parse(fs.readFileSync(FIXTURES, 'utf8'));

// demo / demo — only account for happy-path login
const DEMO_USER = {
  userName: 'demo',
  email: 'demo@example.com',
  password: 'demo',
  fullName: 'Demo User',
};

function b64url(obj) {
  return Buffer.from(JSON.stringify(obj))
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/** Valid-enough JWT for @auth0/angular-jwt isTokenExpired checks */
function makeToken(sub = 'demo') {
  const header = b64url({ alg: 'none', typ: 'JWT' });
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 30d
  const payload = b64url({
    sub,
    unique_name: DEMO_USER.userName,
    email: DEMO_USER.email,
    exp,
  });
  return {
    accessToken: `${header}.${payload}.demo-sig`,
    refreshToken: `refresh-${sub}-${Date.now()}`,
    expirationTime: new Date(exp * 1000).toISOString(),
  };
}

function tokenResponse(sub) {
  return { token: makeToken(sub) };
}

function send(res, status, body, headers = {}) {
  const payload = body === undefined ? '' : JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    ...headers,
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function matchLogin(body) {
  const id = (body.userNameOrEmail || body.userName || body.email || '')
    .toString()
    .trim()
    .toLowerCase();
  const password = (body.password || '').toString();
  return (
    password === DEMO_USER.password &&
    (id === DEMO_USER.userName || id === DEMO_USER.email)
  );
}

async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return send(res, 204, undefined);
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  const method = req.method || 'GET';

  // Health (not used by Angular; handy for scripts)
  if (method === 'GET' && (pathname === '/health' || pathname === '/api/health')) {
    return send(res, 200, {
      ok: true,
      service: 'bofa-devin-demo-api',
      products: products.length,
      happyPaths: ['GET /api/products', 'POST /api/auth/login (demo/demo)'],
    });
  }

  // --- files ---
  if (
    method === 'GET' &&
    /^\/api\/files\/GetBaseStorageUrl$/i.test(pathname)
  ) {
    // Empty base + empty image paths → storefront uses assets/product.png
    return send(res, 200, { url: '' });
  }

  // --- auth ---
  if (method === 'POST' && /^\/api\/auth\/login$/i.test(pathname)) {
    let body;
    try {
      body = await readBody(req);
    } catch {
      return send(res, 400, [{ key: 'body', value: ['Invalid JSON'] }]);
    }
    if (!matchLogin(body)) {
      return send(res, 400, [
        { key: 'auth', value: ['Invalid username or password (use demo / demo)'] },
      ]);
    }
    return send(res, 200, tokenResponse(DEMO_USER.userName));
  }

  if (
    method === 'POST' &&
    /^\/api\/auth\/refreshtokenlogin$/i.test(pathname)
  ) {
    return send(res, 200, tokenResponse(DEMO_USER.userName));
  }

  if (
    method === 'POST' &&
    /^\/api\/auth\/(google-login|facebook-login)$/i.test(pathname)
  ) {
    // Accept any social payload for offline demos
    return send(res, 200, tokenResponse('social-demo'));
  }

  // --- users (register) ---
  if (method === 'POST' && /^\/api\/users$/i.test(pathname)) {
    let body;
    try {
      body = await readBody(req);
    } catch {
      return send(res, 400, { succeeded: false, message: 'Invalid JSON' });
    }
    if (!body.userName || !body.email || !body.password) {
      return send(res, 200, {
        succeeded: false,
        message: 'userName, email, and password are required',
      });
    }
    return send(res, 200, {
      succeeded: true,
      message: 'User created (mock — not persisted across restarts)',
    });
  }

  // --- products: showcase / images / delete image (before :id routes) ---
  if (
    method === 'GET' &&
    /^\/api\/products\/ChangeShowcaseImage$/i.test(pathname)
  ) {
    return send(res, 200, {});
  }

  if (
    method === 'GET' &&
    /^\/api\/products\/getProductImages\/[^/]+$/i.test(pathname)
  ) {
    const id = pathname.split('/').pop();
    const p = products.find((x) => x.id === id);
    return send(res, 200, (p && p.productImageFiles) || []);
  }

  if (
    method === 'DELETE' &&
    /^\/api\/products\/deleteProductImage\/[^/]+$/i.test(pathname)
  ) {
    return send(res, 200, {});
  }

  // --- products collection ---
  if (method === 'GET' && /^\/api\/products$/i.test(pathname)) {
    const page = Math.max(0, parseInt(url.searchParams.get('page') || '0', 10));
    const size = Math.max(
      1,
      parseInt(url.searchParams.get('size') || '5', 10)
    );
    const start = page * size;
    const slice = products.slice(start, start + size);
    return send(res, 200, {
      productsCount: products.length,
      products: slice,
    });
  }

  if (method === 'POST' && /^\/api\/products$/i.test(pathname)) {
    let body;
    try {
      body = await readBody(req);
    } catch {
      return send(res, 400, [{ key: 'body', value: ['Invalid JSON'] }]);
    }
    const created = {
      id: `p-${Date.now()}`,
      name: body.name || 'Untitled',
      stock: Number(body.stock) || 0,
      price: Number(body.price) || 0,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      productImageFiles: [],
    };
    products = [created, ...products];
    return send(res, 200, created);
  }

  if (method === 'DELETE' && /^\/api\/products\/[^/]+$/i.test(pathname)) {
    const id = pathname.split('/').pop();
    products = products.filter((p) => p.id !== id);
    return send(res, 200, {});
  }

  // upload stub (admin image dialog) — accept and no-op
  if (
    method === 'POST' &&
    /^\/api\/products\/upload$/i.test(pathname)
  ) {
    return send(res, 200, {});
  }

  send(res, 404, {
    error: 'Not found',
    path: pathname,
    hint: 'Try GET /health, GET /api/products, POST /api/auth/login',
  });
}

const server = http.createServer((req, res) => {
  handler(req, res).catch((err) => {
    console.error(err);
    send(res, 500, { error: 'Internal mock error', message: String(err) });
  });
});

server.listen(PORT, () => {
  console.log(`[demo-api] mock backend listening on http://localhost:${PORT}`);
  console.log(`[demo-api] health:  GET  http://localhost:${PORT}/health`);
  console.log(`[demo-api] products: GET  http://localhost:${PORT}/api/products?page=0&size=4`);
  console.log(`[demo-api] login:    POST http://localhost:${PORT}/api/auth/login  {demo/demo}`);
});
