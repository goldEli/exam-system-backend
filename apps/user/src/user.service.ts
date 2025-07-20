import { PrismaService } from '@app/prisma';
import { RedisService } from '@app/redis';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Inject(RedisService)
  private redisService: RedisService;

  private logger = new Logger();

  getHello(): string {
    return 'Hello World!';
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data,
      // 返回用户id
      select: {
        id: true,
      },
    });
  }

  async register(data: RegisterUserDto) {
    const captcha = await this.redisService.get(`captcha_${data.email}`);

    this.logger.log(captcha, 'captcha');

    if (!captcha) {
      throw new HttpException('验证已失效', HttpStatus.BAD_REQUEST);
    }

    if (data.captcha !== captcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.prismaService.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (foundUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    try {
      const user = await this.prismaService.user.create({
        data: {
          username: data.username,
          password: data.password,
          email: data.email,
        },
        select: {
          id: true,
          username: true,
          email: true,
          createTime: true,
        },
      });
      return user;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
