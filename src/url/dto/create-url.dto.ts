import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  longLink: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  custom: string;
}
