import { Module } from '@nestjs/common';
import { CommodityController } from './commodity.controller';

@Module({
  controllers: [CommodityController]
})
export class CommodityModule {}
