import { IsString } from 'class-validator';

export class CreateUrlCollectionDto {
  @IsString()
  name: string;

  @IsString()
  owner: string;
}
