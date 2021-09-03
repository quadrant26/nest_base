import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommodityService } from './commodity.service';
import { RbacInterceptor } from '../../interceptor/rbac.interceptor';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commdityService: CommodityService) {}

  // 查询商品列表
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(1))
  @Post('list')
  async queryColumnList(@Body() body: any) {
    return await this.commdityService.queryCommodityList(body);
  }

  // 新建商品
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(1))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req: any) {
    return await this.commdityService.createCommodity(body, req.user.username);
  }

  // 修改商品
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(1))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
    return await this.commdityService.updateCommodity(body, req.user.username);
  }

  // 删除商品
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(1))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commdityService.deleteCommodity(body);
  }
}
