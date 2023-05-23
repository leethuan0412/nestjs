import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';

@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }
}
