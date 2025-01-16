import OrderRepository from "../infrastructure/order.repository";

export class CancelOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository
  ) {}

  async execute(orderId: string): Promise<void> {
    const orderIdNumber = Number(orderId);
    if (isNaN(orderIdNumber)) {
      throw new Error(`Invalid orderId: ${orderId}`);
    }

    const order = await this.orderRepository.findById(orderIdNumber);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    if (order.status === 'CANCELLED') {
      throw new Error(`Order with ID ${orderId} is already cancelled.`);
    }

    if (!order.paidAt) {
      throw new Error(`Order with ID ${orderId} cannot be cancelled because it has not been paid.`);
    }

    order.status = 'CANCELLED';
    await this.orderRepository.update(order);
  }
}
