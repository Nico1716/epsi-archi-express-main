export class Product {
  private id: number;

  title: string;

  private description: string;

  price: number;

  constructor(title: string, price: number, description: string) {
    this.validateTitle(title);
    this.validateDescription(description);

    if (price <= 0) {
      throw new Error("Product price must be greater than 0.");
    }

    this.id = Math.floor(Math.random() * 10000); // Je crée un ID unique
    this.title = title;
    this.price = price;
    this.description = description;
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length < 4 || title.trim().length > 50) {
      throw new Error("Product title must be between 4 and 50 characters.");
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length < 10 || description.trim().length > 100) {
      throw new Error("Product description must be between 10 and 100 characters.");
    }
  }
  
  getId(): number {
    return this.id;
  }

  update(title: string, price: number, description: string): void {
    this.validateTitle(title);
    this.validateDescription(description);

    if (price <= 0) {
      throw new Error("Product price must be greater than 0.");
    }

    this.title = title;
    this.price = price;
    this.description = description;
  }
}
