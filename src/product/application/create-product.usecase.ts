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
      const existingProduct = this.productRepository.findByTitle(title);
      if (existingProduct) {
        throw new Error(`Product with name "${title}" already exists.`);
      }

      // Créer le produit et le persister
      const product = new Product(title, price, description);
      return this.productRepository.create(product);
    } catch (error: any) {
      return { error: error.message };
    }
  }
}