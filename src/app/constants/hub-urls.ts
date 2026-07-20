import { environment } from 'src/environments/environment';

/** Product SignalR hub URL (unused when environment.realtimeEnabled is false). */
export const ProductHubUrl =
  environment.productHubUrl || 'http://localhost:3333/products-hub';

/** @deprecated Prefer ProductHubUrl — kept for any stale imports */
export const HubUrls = {
  ProductHub: ProductHubUrl,
} as const;
