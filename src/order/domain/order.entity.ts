import { Product } from "../../product/domain/product.entity";

export default class Order {
  private id: number;

  private createdAt: Date;

  total: number;

  private customer: number;

  private products: Product[];

  private status: string;

  private paidAt: Date;

  private shippedAt: Date;

  constructor(customerId: number, products: Product[]) {
    if (!customerId) {
      throw new Error("customerId is required");
    }

    if (products.length > 4) {
      throw new Error("You can't add more than 2 products");
    }

    this.createdAt = new Date();
    this.customer = customerId;
    this.products = products;
    this.status = "cart";

    this.total = products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  }

  getId(): number {
    return this.id;
  }

  pay(): void {
    if (this.products.length === 0) {
      throw new Error("You can't pay an empty cart");
    }

    if (this.status === "paid") {
      throw new Error("Order already paid");
    }

    if (this.status === "canceled") {
      throw new Error("You can't pay a canceled order");
    }

    if (this.total === 0) {
      throw new Error("You can't pay an empty cart");
    }

    this.status = "paid";
    this.paidAt = new Date();
  }

  ship(): void {
    if (this.status !== "paid") {
      throw new Error("You can't ship an order that is not paid");
    }
    this.status = "shipped";
    this.shippedAt = new Date();
  }

  cancel(): void {
    if (this.status === "canceled") {
      throw new Error("Order already canceled "); 
    }
    if (this.status !== "paid") {
      throw new Error("You can't cancel an order that is not paid");
    } 
    this.status = "canceled";
    this.paidAt = new Date();
  }

  addProducts(newProducts: Product[]): void {

    if (this.status !== "cart") {
      throw new Error("You can't update an order that is not in the cart");
    } 

    const totalProducts = this.products.length + newProducts.length;
  
    if (totalProducts > 4) {
      throw new Error("You can't add more than 4 products in total.");
    }
  
    for (const product of newProducts) {
      this.products.push(product);
      this.total += product.price;
    }
  }

  getStatus(): string {
    return this.status;
  }

  getProducts(): Product[] {
    return this.products;
  }

}
