import { Product } from "../domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";
import ProductContainer from "../product.container";

export class CreateProductUseCase {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = ProductContainer.getProductRepository();
  }

  execute(title: string, description: string, price: number): Product | { error: string } {
    try {
      // Vérifier si un produit avec le même nom existe déjà
      let product = this.productRepository.findByTitle(title);
      if(!product){
        product = new Product(title, price, description);
        this.productRepository.create(product);
      } else {
        product.update(title, price, description);
        this.productRepository.update(product);
      }
      return product;
    } catch (error: any) {
        return { error: error.message
        };
    }
  }
}