import { Product } from "../../product/domain/product.entity";
import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import { OrderContainer } from "../order.container";

export class CreateOrderUseCase {
  
    private orderRepository: OrderRepository;

    constructor() {
      this.orderRepository = OrderContainer.getOrderRepository();
    }
  
  createOrder(customerId: number, products: [Product]): Order | { error: string } {
    const orderCreated = new Order(customerId, products);

    try {
      const orderPersisted = this.orderRepository.create(orderCreated);

      console.log(orderPersisted);
      return orderPersisted;
    } catch (error: any) {
      return { error: error.message };
    }
  }
}