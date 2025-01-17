import ProductRepository from "./infrastructure/product.repository";

class ProductContainer {
  private static productRepository: ProductRepository;

  static getProductRepository(): ProductRepository {
    if (!this.productRepository) {
      this.productRepository = new ProductRepository();
    }
    return this.productRepository;
  }
}

export default ProductContainer;