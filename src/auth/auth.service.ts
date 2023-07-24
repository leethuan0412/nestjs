import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO, AuthLogin } from './validate/auth.dto';
import * as agron from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(authDTO: AuthDTO) {
    const hashPassword = await agron.hash(authDTO.password);

    //push data do databse
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          password: hashPassword,
          firstName: '',
          lastName: '',
          avatar: '',
        },
        // hien thi truong nao thi true
        select: {
          id: true,
          email: true,
          createAt: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      });
      return await this.signJwtToken(user.id, user.email);
    } catch (err) {
      if (err.code == 'P2002') {
        throw new ForbiddenException(err.message);
      }
    }
  }

  async login(authDTO: AuthLogin) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('user not found');
    }
    const hashedPassword = await agron.verify(user.password, authDTO.password);
    console.log(user.password);
    console.log('-------');
    console.log(authDTO.password);

    if (!hashedPassword) {
      throw new ForbiddenException('password incorrect');
    }
    delete user.password; // khong hien thi
    return await this.signJwtToken(
      user.id,
      user.email,
      // user.firstName,
      // user.lastName,
    );
  }

  async signJwtToken(
    userId?: number,
    email?: string,
    // firstName?: string,
    // lastName?: string,
  ): Promise<{ accessToken: string; user?: {} }> {
    try {
      const payload = {
        sub: userId,
        email,
        // firstName,
        // lastName,
      };
      const jwtString = await this.jwtService.signAsync(payload, {
        expiresIn: '10m', // time
        secret: this.configService.get('TOKEN'),
      });
      return {
        //co the them vao
        // user: {
        //   id: userId,
        //   email: email,
        //   firstName: firstName,
        //   lastName: lastName,
        // },
        accessToken: jwtString,
      };
    } catch (err) {
      console.log(err);
    }
  }

  loginGoogle(req: { user: any }) {
    console.log(req, 'req');

    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
  /*
  async loginGoogle(user: any) {
    const payload = { username: user.username, sub: user.userId };
    console.log(user, 'user');

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
   */
}
