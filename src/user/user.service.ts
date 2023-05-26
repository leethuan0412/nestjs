import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateInfor } from './validate/update.user.dto';

@Injectable({})
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async updateProfile(user: User, updateInfor: UpdateInfor) {
    console.log(user, 'userrrr');

    return this.prismaService.user.update({
      data: { ...updateInfor },
      where: {
        id: user.id,
      },
    });
  }
}
