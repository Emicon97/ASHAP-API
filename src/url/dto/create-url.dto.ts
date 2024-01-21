import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  longLink: string;

  @IsOptional()
  @IsString()
  custom: string;
}
