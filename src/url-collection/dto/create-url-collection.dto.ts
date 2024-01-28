import { IsOptional, IsString } from 'class-validator';

export class CreateUrlCollectionDto {
  @IsString()
  owner: string;

  @IsOptional()
  @IsString()
  name?: string;
}
