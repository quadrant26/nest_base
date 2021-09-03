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
import { roleConstans as role } from '../auth/constants';
import { RbacGuard } from '../../guards/rbac.guard';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commdityService: CommodityService) {}

  // 注意：RbacGuard 要在 AuthGuard 的上面，不然获取不到用户信息。

  // 查询商品列表
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.HUMAN))
  @Post('list')
  async queryColumnList(@Body() body: any) {
    return await this.commdityService.queryCommodityList(body);
  }

  // 新建商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req: any) {
    return await this.commdityService.createCommodity(body, req.user.username);
  }

  // 修改商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
    return await this.commdityService.updateCommodity(body, req.user.username);
  }

  // 删除商品
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.ADMIN))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commdityService.deleteCommodity(body);
  }

}
