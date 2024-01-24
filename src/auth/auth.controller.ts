import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthInterceptor } from './interceptors';
import { JwtPayload, RefreshPayload, TokenResponse } from './types';
import { RefreshGuard } from './guards/refresh.guard';
import { RefreshService } from './refresh.service';
import { GetRefresh } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshService: RefreshService,
    private readonly userService: UserService,
  ) {}

  @UseInterceptors(AuthInterceptor)
  @Post('signup')
  async signup(@Body() createAuthDto: CreateUserDto) {
    if (createAuthDto.password) {
      createAuthDto.password = this.authService.hash(createAuthDto.password);
    }

    const user = await this.userService.create(createAuthDto);

    const jwtPayload: JwtPayload = { id: user._id };
    const tokens: TokenResponse = {
      accessToken: this.authService.generatetAccessToken(jwtPayload),
      refreshToken: await this.refreshService.generateRefreshToken(jwtPayload, true),
    };

    return { ...user, ...tokens };
  }

  @UseInterceptors(AuthInterceptor)
  @Post('login')
  async login(@Body() createAuthDto: CreateUserDto) {
    const user = await this.userService.findOne(
      { email: createAuthDto.email },
      { select: '+password' },
    );

    if (!user)
      throw new UnauthorizedException('The email is not associated with any user.');

    if (user.password && !createAuthDto.password)
      throw new UnauthorizedException('Password is required.');

    if (!user.password && createAuthDto.password)
      throw new UnauthorizedException('Password is incorrect.');

    // passwordless login guard is yet to be implemented.

    const passwordComparison = await this.authService.compare(
      createAuthDto.password,
      user.password,
    );

    if (!passwordComparison) throw new UnauthorizedException('Password is incorrect.');

    delete user.password;

    const jwtPayload: JwtPayload = { id: user._id };
    const tokens: TokenResponse = {
      accessToken: this.authService.generatetAccessToken(jwtPayload),
      refreshToken: await this.refreshService.generateRefreshToken(jwtPayload),
    };

    return { ...user, ...tokens };
  }

  @UseGuards(RefreshGuard)
  @UseInterceptors(AuthInterceptor)
  @Get('refresh')
  async handleRefreshToken(@GetRefresh() refresh: RefreshPayload) {
    await this.refreshService.handleRefreshToken(refresh);

    const jwtPayload: JwtPayload = { id: refresh.id };
    const tokens: TokenResponse = {
      accessToken: this.authService.generatetAccessToken(jwtPayload),
      refreshToken: await this.refreshService.generateRefreshToken(jwtPayload),
    };

    return tokens;
  }
}
