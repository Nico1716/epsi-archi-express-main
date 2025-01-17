import ProductRepository from "../infrastructure/product.repository";
import ProductContainer from "../product.container";
import { Product } from "../domain/product.entity";

export class ShowProductsUseCase {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = ProductContainer.getProductRepository();
  }

  execute(): Product[] {
    return this.productRepository.findAll();
  }
}