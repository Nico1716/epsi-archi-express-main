import OrderRepository from "../infrastructure/order.repository";

interface CancelOrderParams {
  orderId: string;
}

interface Order {
  id: string;
  status: string;
  paidAt: Date | null; 
}

export class CancelOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository
  ) {}

  async execute(params: CancelOrderParams): Promise<void> {
    const { orderId } = params;

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
