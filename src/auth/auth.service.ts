import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(
    authenticateUserDto: AuthenticateUserDto,
  ): Promise<{ accessToken: string }> {
    const payload = await this.userRepository.validatePassword(
      authenticateUserDto,
    );

    if (!payload) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async getUser(user: User) : Promise<User> {
    const userEntity = await this.userRepository.findOne({email: user.email})
    if (!userEntity) {
      throw new NotFoundException(`User with email ${user.email} not found`)
    }

    delete userEntity.password;
    delete userEntity.salt;

    return userEntity;
  }

  async updateUser(email : string, updateUserDto : UpdateUserDto) : Promise<User> {
    const user = await this.userRepository.findOne({email})
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`)
    }

    const {email: userEmail, firstName, lastName} = updateUserDto;

    if (userEmail) {
      user.email = email;
    }

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    await user.save();

    delete user.password;
    delete user.salt;

    return user;
  }
}
