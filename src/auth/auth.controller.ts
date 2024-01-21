import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  signup(@Body() createAuthDto: CreateUserDto) {
    if (createAuthDto.password) {
      createAuthDto.password = this.authService.hashPassword(
        createAuthDto.password,
      );
    }

    return this.userService.create(createAuthDto);
  }

  @Post('login')
  async login(@Body() createAuthDto: CreateUserDto) {
    const user = await this.userService.findOne(
      { email: createAuthDto.email },
      '+password',
    );

    if (!user)
      throw new UnauthorizedException(
        'The email is not associated with any user.',
      );

    if (!createAuthDto.password && user.password)
      throw new UnauthorizedException('Password is required.');

    if (createAuthDto.password && !user.password)
      throw new UnauthorizedException('Password is incorrect.');

    const passwordComparison = await this.authService.comparePasswords(
      createAuthDto.password,
      user.password,
    );

    if (!passwordComparison)
      throw new UnauthorizedException('Password is incorrect.');

    // passwordless login guard is yet to be implemented.

    delete user.password;
    return { ...user, token: this.authService.getToken({ id: user._id }) };
  }
}
