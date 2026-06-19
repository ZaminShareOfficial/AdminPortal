/**
 * Swagger API map for the ZaminShare admin panel.
 * Base path: /api/v1 (proxied via next.config rewrites).
 */
export const API_ENDPOINTS = {
  auth: {
    sendOtp: "POST /otp",
    verifyOtp: "POST /otp/verify",
    profile: "GET /me",
    updateProfile: "PATCH /me",
  },
  properties: {
    list: "GET /properties",
    get: "GET /properties/{id}",
    create: "POST /admin/properties",
    update: "PATCH /admin/properties/{id}",
  },
  ipo: {
    list: "GET /ipos",
    get: "GET /ipos/{ipoId}",
    create: "POST /admin/ipos",
    updateStatus: "PATCH /admin/ipos/{ipoId}/status",
    mint: "POST /admin/ipos/{ipoId}/mint",
    subscribe: "POST /ipos/{ipoId}/subscribe",
    modifySubscription: "PATCH /ipos/{ipoId}/subscribe",
  },
  orders: {
    bulletin: "GET /orders/all",
    orderBook: "GET /properties/{propertyId}/orderbook",
    myOrders: "GET /orders",
    place: "POST /orders",
    modify: "PATCH /orders/{orderId}",
    trades: "GET /orders/{orderId}/trades",
  },
  portfolio: {
    allUsers: "GET /portfolio",
    adminProperties: "GET /admin/portfolio/properties",
    propertyHolders: "GET /admin/portfolio/properties/{propertyId}",
  },
  kyc: {
    status: "GET /kyc",
    submitPan: "POST /kyc/pan",
  },
  internal: {
    sendNotification: "POST /internal/admin/notification/send",
    createTemplate: "POST /admin/template",
    updateTemplate: "PATCH /admin/template",
  },
  uploads: {
    upload: "POST /admin/uploads (Next.js route)",
  },
} as const;

export const SCREEN_API_MAP = {
  dashboard: ["properties.list", "ipo.list", "orders.bulletin", "portfolio.allUsers"],
  properties: ["properties.list"],
  ipo: ["ipo.list"],
  orders: ["orders.bulletin", "orders.orderBook"],
  users: ["portfolio.allUsers"],
  finance: ["portfolio.allUsers"],
  tokens: ["portfolio.adminProperties", "portfolio.propertyHolders"],
  complaints: [],
  settings: [],
} as const;
