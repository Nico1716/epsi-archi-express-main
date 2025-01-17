import { Product } from "../../product/domain/product.entity";
import ProductContainer from "../../product/product.container";
import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import OrderContainer from "../order.container";

export class UpdateOrderUseCase {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = OrderContainer.getOrderRepository();
  }

  addProducts(customerId: number, products: [productId: number]): Order | { error: string } {

      // récupère une commande par l'id du client et par le status cart
      const cartForCustomer = this.orderRepository.findCartByCustomer(customerId);

      // récupère la liste de produits par leur id pour pouvoir les insérer
      const productList = products.map(productId => {
        const product = ProductContainer.getProductRepository().findById(productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found.`);
        }
        return product;
      });

      if (!cartForCustomer) {

        const order = new Order(customerId, productList);

        return this.orderRepository.create(order);

      }

        cartForCustomer.addProducts(productList);

        return this.orderRepository.update(cartForCustomer);

  }
}
