import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const { isAdmin } = createUserDto;
    createUserDto.isAdmin = isAdmin.toString() === 'true' ? true : false;

    return this.authService.createUser(createUserDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authenticateUserDto: AuthenticateUserDto) {
    return this.authService.signIn(authenticateUserDto);
  }
}
