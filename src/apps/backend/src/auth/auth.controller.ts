import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  IniciarSesion(@Body() body: { email: string; password: string }) {
    return this.authService.IniciarSesion(body.email, body.password);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  CerrarSesion(@Req() req: any) {
    return this.authService.CerrarSesion(req.user);
  }
}
