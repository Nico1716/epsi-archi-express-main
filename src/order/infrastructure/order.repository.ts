import Order from "../domain/order.entity";
import OrderRepositoryInterface from "../domain/order.repository.interface";

export default class OrderRepository implements OrderRepositoryInterface {
  private orders: Order[] = [];

  create(order: Order): Order {
    const orderWithId = { ...order, id: this.orders.length + 1 } as unknown as Order;

    this.orders.push(orderWithId);

    return orderWithId;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findById(id: number): Order | undefined {
    return this.orders.find((order) => order.getId() === id);
  }

  update(order: Order): Order {
    this.orders = this.orders.map((orderInList) => {
      if (orderInList.getId() === order.getId()) {
        return order;
      }

      return orderInList;
    });

    return order;
  }
}
