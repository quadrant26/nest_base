import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CurrentBodyDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string | number;
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly realNmae: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @IsNumber()
  readonly mobile: string;
  readonly role?: string | number;
}
