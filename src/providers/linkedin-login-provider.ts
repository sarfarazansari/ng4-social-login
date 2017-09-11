import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, loginProviderClass, linkedInResponse } from '../entities/user';

declare let IN: any;

export class LinkedinLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = 'LINKEDIN';
  public loginProviderObj: loginProviderClass = new loginProviderClass();

  constructor(private clientId: string) {
    super();
    this.loginProviderObj.id = clientId;
    this.loginProviderObj.name = 'LINKEDIN';
    this.loginProviderObj.url = 'https://platform.linkedin.com/in.js';
  }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(this.loginProviderObj, () => {
          IN.init({
            api_key: this.clientId,
            authorize: true,
            onLoad: this.onLinkedInLoad()
          });

          IN.Event.on(IN, 'auth', () => {
            if (IN.User.isAuthorized()) {
              IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result( (res: linkedInResponse) => {
                resolve(this.drawUser(res));
              });
            }
          });

        });
    });
  }

  onLinkedInLoad() {
    IN.Event.on(IN, 'systemReady', () => {
      IN.User.refresh();
    });
  }

  drawUser(response: linkedInResponse): SocialUser{
    let user: SocialUser = new SocialUser();
    user.id = response.emailAddress;
    user.name = response.firstName + ' ' + response.lastName;
    user.email = response.emailAddress;
    user.photoUrl = response.pictureUrl;
    return user;
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      IN.User.authorize( () => {
        IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result( (res: linkedInResponse) => {
          resolve(this.drawUser(res));
        });
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      IN.User.logout((response: any) => {
        resolve();
      });
    });
  }

}
