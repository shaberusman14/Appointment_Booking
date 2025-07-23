import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/patient/register')
  registerPatient(@Body() dto: RegisterDto) {
    return this.authService.register(dto, 'patient');
  }

  @Post('/doctor/register')
  registerDoctor(@Body() dto: RegisterDto) {
    return this.authService.register(dto, 'doctor');
  }

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
