import { User } from 'src/user/schemas/user.schema';
import { TokenResponse } from './';

export type AuthResponse = User & TokenResponse;
