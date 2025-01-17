import { Product } from "../../product/domain/product.entity";
import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import OrderContainer from "../order.container";

export class UpdateOrderUseCase {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = OrderContainer.getOrderRepository();
  }

  addProducts(customerId: number, products: [Product]): Order | { error: string } {
    

    try {
      let order = this.orderRepository.findById(customerId);
      if (!order) {
        order = new Order(customerId, products);
        this.orderRepository.create(order);
      } else {
        order.addProducts(products);
        this.orderRepository.update(order);
      }
      return order;
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
