import { ProductEntity } from '../entities/product.entity';
import { faker } from '@faker-js/faker';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductFactory {
  constructor(private readonly httpService: HttpService) {}

  async definition(): Promise<ProductEntity> {
    const product = new ProductEntity();

    // Generar un nombre de producto relacionado con una categoría específica
    const productName = faker.commerce.productName(); // puedes usar productName o crear una función personalizada

    // Generar una descripción de producto relacionada
    const productDescription = `Este es un excelente ${productName} que cumple con todas tus expectativas.`;
    // Obtener una URL de imagen relacionada
    const imageUrl = await this.getImageUrl(productName);
    // Generar el resto de los datos del producto
    const unitPrice = parseFloat(faker.commerce.price());
    const unitsInStock = faker.number.int({ min: 0, max: 100 });

    // Asignar los valores al producto
    product.productName = productName;
    product.productDescription = productDescription;
    product.imageUrl = imageUrl;
    product.unitPrice = unitPrice;
    product.unitsInStock = unitsInStock;

    return product;
  }

  // Función para obtener una URL de imagen relacionada con el nombre del producto
  async getImageUrl(productName: string): Promise<string> {
    // Ejemplo usando la API de Unsplash para obtener imágenes relacionadas
    // Nota: Necesitarás una clave API de Unsplash y configurar una URL de búsqueda adecuada
    const query = encodeURIComponent(productName);
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=Q_25CsBktTNOkdSXu3JU3j_y87DUTMlV0nl2xCwzh5A`,
          {},
        ),
      );
      return (
        response.data.results[0]?.urls?.full ||
        'https://via.placeholder.com/1600x900?text=Product+Image'
      );
    } catch (error) {
      return 'https://via.placeholder.com/1600x900?text=Product+Image';
    }
  }
}
