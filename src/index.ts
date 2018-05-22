export { SocialLoginModule } from './auth.module';
export { AuthService, AuthServiceConfig } from './auth.service';
// export { LoginProvider, SocialUser, LoginProviderClass, LinkedInResponse } from './entities';
export { LoginProvider } from './entities/login-provider';
export { SocialUser, LinkedInResponse, LoginProviderClass } from './entities/user';
// export { FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from './providers';
export { FacebookLoginProvider } from './providers/facebook-login-provider';
export { GoogleLoginProvider } from './providers/google-login-provider';
export { LinkedinLoginProvider } from './providers/linkedin-login-provider';
