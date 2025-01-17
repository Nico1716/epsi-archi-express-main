import ProductRepository from "../infrastructure/product.repository";
import OrderRepository from "../../order/infrastructure/order.repository";
import ProductContainer from "../product.container";
import OrderContainer from "../../order/order.container";
import { Product } from "../domain/product.entity";

export class CancelProductUseCase {
  private productRepository: ProductRepository;
  private orderRepository: OrderRepository;

  constructor() {
    this.productRepository = ProductContainer.getProductRepository();
    this.orderRepository = OrderContainer.getOrderRepository();
  }

  execute(productTitle: string): Product | { error: string } {
    try {
      const product = this.productRepository.findByTitle(productTitle);
      if (!product) {
        throw new Error(`Product named "${productTitle}" not found.`);
      }

      // Vérifier si le produit est dans une commande "cart"
      const orders = this.orderRepository.findAll();
      const isInCart = orders.some(order =>
        order.getStatus() === "cart" &&
        order.getProducts().some(p => p.getId() === product.getId())
      );

      if (isInCart) {
        throw new Error(
          `Product "${productTitle}" is in a cart and cannot be deleted.`
        );
      }

      return this.productRepository.delete(product);
    } catch (error: any) {
      return { error: error.message };
    }
  }
}