import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDTO, AuthLogin } from './validate/auth.dto';
@Controller('auth') //duong dan
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }

  @Post('/login')
  login(@Body() body: AuthLogin) {
    return this.authService.login(body);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  loginGoogle(@Req() req) {
    return this.authService.loginGoogle(req);
  }

  // async googleAuthRedirect(@Req() req, @Res() res) {

  //   // const token = await this.authService.loginGoogle(req.user);
  //   // res.redirect(`/dashboard?token=${token.access_token}`);
  // }
}
