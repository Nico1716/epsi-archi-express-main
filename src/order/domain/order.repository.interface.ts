import Order from "./order.entity";

export default interface OrderRepositoryInterface {
  create(order: Order): Order;
  findById(orderId: number): Order;
  update(order: Order): Order;
  findAll(): Order[];
}
