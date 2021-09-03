import {
  Controller,
  Get,
  Param,
  Req,
  Body,
  Query,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { CurrentBodyDto } from './user.dto';
import { ValidationPipe } from '../../pipe/validation.pipe';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('find-one')
  async findOne(@Query() query) {
    const { username } = query;
    return await this.userService.findOne(username);
  }

  @Post('register')
  async register(@Body() body) {
    return await this.userService.register(body);
  }

  @Post('login')
  async login(@Body() loginParams) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParams.accountName,
      loginParams.password,
    );

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: '账户或密码不正确',
        };
      default:
        return {
          code: 600,
          msg: '查无此人',
        };
    }
  }

  @Post('userinfo')
  @UseGuards(AuthGuard('jwt'))
  async userInfo(@Body() body) {
    const { accountName } = body;
    return await this.userService.findOne(accountName);
  }

  @Post('userinfo2')
  @UseGuards(AuthGuard('jwt'))
  async userInfo2(@CurrentUser() user) {
    return user;
  }

  @Post('register2')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async register2(@Body() body: CurrentBodyDto) {
    // 指定 dto 类型
    return await this.userService.register(body);
  }
}
