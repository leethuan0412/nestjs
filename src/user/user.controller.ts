import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { UserService } from './user.service';
import { UpdateInfor } from './validate/update.user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
    // authService.doSomething();
  }
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    console.log(user);

    return user;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() avatar, @Body() UpdateInfor: UpdateInfor) {}

  @Get(':imgpath')
  seeUploadFile(@Param('imgpath') image, @Res() res) {
    console.log(image, 'images');

    return res.sendFile(image, {
      root: 'uploads',
    });
  }
  @Put('/update')
  @UseGuards(MyJwtGuard)
  updateProfile(
    @GetUser() user: User,
    @UploadedFile() @Body() updateInfor: UpdateInfor,
  ) {
    return this.userService.updateProfile(user, updateInfor);
  }

  @Delete('/delete')
  @UseGuards(MyJwtGuard)
  deleteAccount(@GetUser() user: User) {
    return this.userService.deleteAccount(user);
  }
}
