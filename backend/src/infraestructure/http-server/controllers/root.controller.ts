import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('Root')
@Controller()
export class RootController {
  @Get()
  @ApiResponse({ description: 'App root endpoint response' })
  root() {
    return {
      app: 'nestjs-hexagonal-app',
      developer: 'Jaime Ruiz',
    };
  }
}
