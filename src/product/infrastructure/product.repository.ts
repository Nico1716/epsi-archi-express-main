import { Product } from "../domain/product.entity";

export default class ProductRepository {
    private products: Product[] = [];

    create(product: Product): Product {
        this.products.push(product);
        return product;
    };

    findByTitle(title: string): Product | undefined {
        return this.products.find((product) => product.title === title);
    };
}