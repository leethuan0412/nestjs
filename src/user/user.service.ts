import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePassword, UpdateInfor } from './validate/update.user.dto';
import * as agron from 'argon2';
@Injectable({})
export class UserService {
  constructor(private prismaService: PrismaService) {}
  updateProfile(user: User, updateInfor: UpdateInfor) {
    return this.prismaService.user.update({
      data: { ...updateInfor },
      where: {
        id: user.id,
      },
    });
  }
  deleteAccount(user: User) {
    return this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  }
  async changePassword(user: User, body: ChangePassword) {
    const hashPassword = await agron.hash(body.new_password);
    const hashedPassword = await agron.verify(user.password, body.old_password);

    if (!hashedPassword) {
      throw new ForbiddenException('password incorrect');
    } else if (body.new_password !== body.confirmPassword) {
      throw new ForbiddenException('password not match');
    }
    return this.prismaService.user.update({
      data: {
        password: hashPassword,
      },
      where: {
        id: user.id,
      },
    });
  }
}
