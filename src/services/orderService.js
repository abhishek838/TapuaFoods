import { apiClient } from './api';

const ORDERS_STORAGE_KEY = 'tapua_demo_orders';

export const orderService = {
  /**
   * Place an order (simulates Spring Boot POST /api/orders)
   */
  async createOrder(orderData) {
    // Simulate real network & payment processing latency (1.2 seconds)
    await apiClient.delay(1200);

    const orderId = `TPA-DEMO-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      estimatedDelivery: '3–5 Business Days',
      ...orderData
    };

    // Store in localStorage for user account orders history demo
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      existing.unshift(newOrder);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    return newOrder;
  },

  /**
   * Get user's orders (simulates GET /api/orders/my-orders)
   */
  async getUserOrders() {
    await apiClient.delay(200);
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read orders', e);
    }

    // Default sample orders if empty
    return [
      {
        id: 'TPA-DEMO-87421',
        createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
        status: 'Delivered',
        estimatedDelivery: 'Delivered on Oct 25',
        total: 698,
        itemsCount: 2,
        paymentMethod: 'UPI (PhonePe)',
        items: [
          { name: 'Raw White Makhana', quantity: 2, price: 199 },
          { name: 'AAA Grade Raw Pumpkin Seeds', quantity: 1, price: 299 }
        ]
      }
    ];
  },

  /**
   * Get order by ID (simulates GET /api/orders/{id})
   */
  async getOrderById(orderId) {
    await apiClient.delay(100);
    const orders = await this.getUserOrders();
    return orders.find(o => o.id === orderId) || null;
  }
};
