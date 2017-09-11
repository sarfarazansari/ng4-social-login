import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';

declare let FB: any;

export class FacebookLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = 'FACEBOOK';

  constructor(private clientId: string) { super(); }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(FacebookLoginProvider.PROVIDER_ID,
        'https://connect.facebook.net/en_US/sdk.js',
        () => {
          FB.init({
            appId: this.clientId,
            autoLogAppEvents: true,
            cookie: true,
            xfbml: true,
            version: 'v2.9'
          });
          FB.AppEvents.logPageView();

          FB.getLoginStatus(function (response: any) {
            if (response.status === 'connected') {
              FB.api('/me?fields=name,email,picture', (response: any) => {
                resolve(this.drawUser(response));
              });
            }
          });
        });
    });
  }

  drawUser(response: any): SocialUser{
    let user: SocialUser = new SocialUser();
    user.id = response.id;
    user.name = response.name;
    user.email = response.email;
    user.photoUrl = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
    return user;
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          FB.api('/me?fields=name,email,picture', (response: any) => {
            resolve(this.drawUser(response));
          });
        }
      }, { scope: 'email,public_profile' });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.logout((response: any) => {
        resolve();
      });
    });
  }

}
