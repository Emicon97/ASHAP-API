import { IsOptional } from 'class-validator';
import { QueryFunctions } from 'src/common/types/query-functions.type';
import { User } from '../schemas/user.schema';
import { IsStringOrArray } from 'src/common/decorators';

export class UserQueriesDto implements QueryFunctions<User> {
  @IsOptional()
  @IsStringOrArray()
  populate?: string | string[];
}
