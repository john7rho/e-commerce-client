export const environment = {
  production: true,
  // Production builds still default to the local mock so CI/demo boxes don't
  // depend on the original https://localhost:7275 backend.
  apiBaseUrl: 'http://localhost:3333/api',
  apiHost: 'localhost:3333',
  realtimeEnabled: false,
  productHubUrl: 'http://localhost:3333/products-hub',
};
