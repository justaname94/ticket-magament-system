import { Body, Controller, Get,Patch,Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('user')
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

  @Get('profile')
  @UseGuards(AuthGuard())
  profile(@GetUser() user : User) : Promise<User> {
    return this.authService.getUser(user)
  }

  @Patch('profile')
  @UseGuards(AuthGuard())
  updateProfile(@GetUser() user: User, @Body(ValidationPipe) updateUserDto: UpdateUserDto) : Promise<User> {
    return this.authService.updateUser(user.email, updateUserDto);
  }
}
