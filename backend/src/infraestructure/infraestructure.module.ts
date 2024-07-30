import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { PostgressModule } from './postgress/postgress.module';

@Module({
  imports: [SharedModule, PostgressModule],
})
export class InfrastructureModule {}
