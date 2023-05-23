import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, AuthLogin } from './validate/auth.dto';
@Controller('auth') //duong dan
export class AuthController {
  constructor(private authService: AuthService) {
    // authService.doSomething();
  }

  @Post('/register')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
    // json
  }

  @Post('/login')
  login(@Body() body: AuthLogin) {
    return this.authService.login(body);
    // json
  }
}
