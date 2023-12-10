import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions:{
        expiresIn: '24h'
      }
    })
  ]
})
export class AuthModule {}
