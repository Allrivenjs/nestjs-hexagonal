import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AllExceptionsFilter } from '../exception-filters/all-exception-filter.pipe';
import { PRODUCT_APPLICATION } from '../../../core/core.module';
import { ProductApplication } from '../../../core/application/ProductApplication';
import { AppResponse } from '../model/app.response';
import { CreateProductRequest } from '../model/create-product.request';
import { Log } from '../../shared/Log';
import { GenerateFakeRequest } from '../model/generate-fake.request';
import { ProductService } from '../../postgress/service/ProductService';

@ApiTags('Products')
@Controller('/product')
@UseFilters(AllExceptionsFilter)
export class ProductController {
  constructor(
    @Inject(PRODUCT_APPLICATION) private application: ProductApplication,
  ) {}

  @ApiBadRequestResponse({ description: 'Invalid category id or supplier id' })
  @ApiInternalServerErrorResponse({ description: 'Error server' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AppResponse,
  })
  @HttpCode(201)
  @Post()
  async createProduct(
    @Body() request: CreateProductRequest,
  ): Promise<AppResponse> {
    Log.info(`(POST) Create product`, request);
    const productId = await this.application.createProduct(request);
    return {
      status: 201,
      message: `Product(id=${productId}) created OK`,
    };
  }

  @ApiInternalServerErrorResponse({ description: 'Error server' })
  @ApiCreatedResponse({
    description: 'All products',
    type: AppResponse,
  })
  @HttpCode(200)
  @Get()
  async getProducts() {
    Log.info(`(GET) Get all products`);
    const products = await this.application.findAll();
    return {
      status: 200,
      data: products,
    };
  }

  @ApiInternalServerErrorResponse({ description: 'Error server' })
  @Post('generate-fake')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AppResponse,
  })
  async generateFakeProducts(@Body() request: GenerateFakeRequest) {
    const count = request.count;
    Log.info(`(POST) Generate fake products count=${count}`);
    const products = await new ProductService(
      this.application,
    ).generateAndSaveFakeProducts(count);
    return {
      status: 201,
      message: `Generated ${count} products`,
      data: products,
    };
  }
}
