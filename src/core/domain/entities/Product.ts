export class Product {
  productId: number;
  productName: string;
  productDescription: string;
  imageUrl: string;
  unitPrice: number;
  unitsInStock: number;

  static create(
    name: string,
    description: string,
    imageUrl: string,
    stock: number,
    price: number,
  ): Product {
    const product = new Product();
    product.productName = name;
    product.productDescription = description;
    product.unitPrice = price;
    product.unitsInStock = stock;
    product.imageUrl = imageUrl;

    return product;
  }
}
