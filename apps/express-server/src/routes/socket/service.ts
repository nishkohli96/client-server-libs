import { Response } from 'express';
import { io } from '@/index';

class SocketService {
	fetchUser() {
	  return new Promise(resolve => {
	    setTimeout(() => resolve({ id: 1, name: 'John Doe' }), 1000);
	  });
	}

	fetchOrders() {
	  return new Promise(resolve => {
	    setTimeout(() => resolve(['Order1', 'Order2', 'Order3']), 2000);
	  });
	}

	fetchNotifications() {
	  return new Promise(resolve => {
	    setTimeout(() => resolve(['New Message', 'New Like']), 1500);
	  });
	}

	rejectPromise() {
	  return new Promise((_, reject) => {
	    reject(['New Message', 'New Like']);
	  });
	}

  async testConnection(res: Response) {
    /**
		 * Promise.all fails if any of the promise is rejected. In this case,
		 * use Promise.allSettled when you need results for all, even if some fail.
		 * Both of these functions however, execute in parallel.
		 *
		 * Promise.all will return an array of result values, whereas Promise.allSettled
		 * will return an array of type:
		 *
		 * status: "fulfilled" | "rejected"
		 * value: someValue if promise is fulfilled
		 * reason: rejectedReasom if promise is rejected
		 */
    const result = await Promise.allSettled([
      this.fetchUser(),
      this.fetchOrders(),
      this.fetchNotifications(),
      this.rejectPromise()
    ]);
    return res.json({
      status: 200,
      message: 'Socket API Test',
      data: result
    });
  }
}

export default new SocketService();
