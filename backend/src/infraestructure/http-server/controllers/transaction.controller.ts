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
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AllExceptionsFilter } from '../exception-filters/all-exception-filter.pipe';
import { Log } from '../../shared/Log';
import { AppResponse } from '../model/app.response';
import { CreateTransactionRequest } from '../model/create-transaction.request';
import { TRANSACTION_APPLICATION } from '../../../core/core.module';
import { TransactionApplication } from '../../../core/application/TransactionApplication';

@ApiTags('Transactions')
@Controller('/transaction')
@UseFilters(AllExceptionsFilter)
export class TransactionController {
  constructor(
    @Inject(TRANSACTION_APPLICATION)
    private application: TransactionApplication,
  ) {}

  @ApiBadRequestResponse({ description: 'Invalid transaction' })
  @ApiInternalServerErrorResponse({ description: 'Error server' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AppResponse,
  })
  @HttpCode(201)
  @Post()
  async createTransaction(
    @Body() request: CreateTransactionRequest,
  ): Promise<AppResponse> {
    Log.info(`(POST) Create transaction`, request);
    const transactionId = await this.application.createTransaction(request);
    return {
      status: 201,
      message: `Transaction(id=${transactionId}) created OK`,
    };
  }

  @ApiBadRequestResponse({ description: 'Invalid transaction' })
  @ApiInternalServerErrorResponse({ description: 'Error server' })
  @ApiCreatedResponse({
    description: 'The record has been successfully get.',
    type: AppResponse,
  })
  @HttpCode(200)
  @Get('/:transactionId')
  async getTransaction(
    @Param('transactionId') transactionId: number,
  ): Promise<AppResponse> {
    Log.info(`(GET) Get transaction`, transactionId);
    const transaction = await this.application.getTransaction(transactionId);
    return {
      status: 200,
      message: `Transaction(id=${transactionId}) get OK`,
      data: transaction,
    };
  }

  // endpoint got actulization of transaction
  @Post('/result')
  async resultTransaction(@Body() result: any): Promise<AppResponse> {
    console.log('result', result);
    return {
      status: 200,
      message: 'Transaction updated',
    };
  }
}
