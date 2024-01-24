import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy, OptionalJwtStrategy, RefreshTokenStrategy } from './strategies';
import { RefreshMongooseModule } from './schemas/refresh.schema';
import { RefreshService } from './refresh.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
    RefreshMongooseModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    OptionalJwtStrategy,
    RefreshService,
  ],
  exports: [JwtStrategy, OptionalJwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
