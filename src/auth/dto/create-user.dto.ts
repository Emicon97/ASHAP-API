import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { safePassword } from 'src/utils/safe-password.utils';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(safePassword)
  password: string;
}
