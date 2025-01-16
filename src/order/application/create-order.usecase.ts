import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import OrderContainer from "../order.container";

export class CreateOrderUseCase {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = OrderContainer.getOrderRepository();
  }

  createOrder(customerId: number, products: []): Order | { error: string } {
    const orderCreated = new Order(customerId, products);

    try {
      const orderPersisted = this.orderRepository.create(orderCreated);

      return orderPersisted;
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
