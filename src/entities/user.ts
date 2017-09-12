export class SocialUser {
  provider: string;
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  token?: string;
}

export class LoginProviderClass {
  name: string;
  id: string;
  url: string;
}

export class LinkedInResponse {
  emailAddress: string;
  firstName: string;
  id: string;
  lastName: string;
  pictureUrl: string;
}
