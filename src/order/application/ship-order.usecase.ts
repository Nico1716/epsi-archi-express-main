import Order from "../domain/order.entity";
import OrderRepositoryInterface from "../domain/order.repository.interface";

export class ShipOrderUseCase {
  private orderRepository: OrderRepositoryInterface;

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository;
  }

  shipOrder(orderId: number): Order {
    const order = this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.ship();

    const orderUpdated = this.orderRepository.update(order);

    return orderUpdated;
  }
}
