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

    findAll(): Product[] {
        return this.products;
    }

    delete(product: Product): Product {
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);
        return product;
    }

    update(product: Product): Product {
        const index = this.products.findIndex((p) => p.getId() === product.getId());
        this.products[index] = product;
        return product;
    }
}