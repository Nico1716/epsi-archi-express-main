import OrderRepository from "../infrastructure/order.repository";
import Order from "../domain/order.entity";

export class CancelOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository
  ) {}

  execute(orderId: string): void {
    const orderIdNumber = Number(orderId);
    if (isNaN(orderIdNumber)) {
      throw new Error(`Invalid orderId: ${orderId}`);
    }

    const order: Order | null = this.orderRepository.findById(orderIdNumber);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    order.cancel(); // Appel de la logique métier dans l'entité

    this.orderRepository.update(order);
  }
}