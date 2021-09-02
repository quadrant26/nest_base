import { Controller, Get, Param, Req, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-one')
  async findOne(@Query() query) {
    const { username } = query;
    return await this.userService.findOne(username);
  }
}
