import { SocialUser } from './user';

export interface LoginProvider {
  isInitialize: boolean;
  initialize(): Promise<SocialUser>;
  signIn(): Promise<SocialUser>;
  signOut(): Promise<any>;
}

