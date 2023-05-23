import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
          // url: 'postgresql://thuanlee:leducthuan11@localhost:5434/mydb?schema=public',
        },
      },
    });
  }
  cleanDatabase() {
    return this.$transaction([this.note.deleteMany(), this.user.deleteMany()]);
  }
}
