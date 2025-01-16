import Order from "../domain/order.entity";
import OrderRepositoryInterface from "../domain/order.repository.interface";

export class PayOrderUseCase {
  private orderRepository: OrderRepositoryInterface;

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository;
  }

  payOrder(orderId: number): Order {
    const order = this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.pay();

    const orderUpdated = this.orderRepository.update(order);

    return orderUpdated;
  }
}
