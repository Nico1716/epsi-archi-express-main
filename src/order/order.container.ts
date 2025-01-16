import OrderRepository from "./infrastructure/order.repository";

export default class OrderContainer {
  private static orderRepository: OrderRepository;

  static getOrderRepository(): OrderRepository {
    if (!OrderContainer.orderRepository) {
      OrderContainer.orderRepository = new OrderRepository();
    }
    return OrderContainer.orderRepository;
  }
}