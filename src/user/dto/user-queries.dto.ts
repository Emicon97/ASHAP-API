import { IsIn, IsNotIn, IsOptional } from 'class-validator';
import { User } from '../schemas/user.schema';
import { QueryFunctions } from 'src/common/types';
import { IsStringOrArray } from 'src/common/decorators';
import { UserKey, userKeys } from '../types';

export class UserQueriesDto implements QueryFunctions<User> {
  @IsOptional()
  @IsStringOrArray()
  @IsNotIn(['password'])
  populate?: string | string[];

  @IsOptional()
  @IsIn(userKeys)
  select?: UserKey;
}
