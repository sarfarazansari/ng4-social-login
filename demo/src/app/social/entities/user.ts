export class SocialUser {
  provider: string;
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  token?: string;
}

export class loginProviderClass {
  name: string;
  id: string;
  url: string;
}

export class linkedInResponse {
  emailAddress: string;
  firstName: string;
  id: string;
  lastName: string;
  pictureUrl: string;
}
