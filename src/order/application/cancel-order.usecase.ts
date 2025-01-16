import OrderRepository from "../infrastructure/order.repository";
import OrderContainer from "../order.container";

export default class CancelOrderUseCase {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = OrderContainer.getOrderRepository();
  }

  cancelOrder(orderId: number) {
    const order = this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.cancel();

    const orderUpdated = this.orderRepository.update(order);

    return orderUpdated;
  }
}
