import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';

declare let IN: any;

export class LinkedinLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = 'LINKEDIN';

  constructor(private clientId: string) { super(); }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(LinkedinLoginProvider.PROVIDER_ID,
        '//platform.linkedin.com/in.js',
        () => {
          IN.init({
            api_key: this.clientId,
            authorize: true,
            scope: ['r_emailaddress', 'r_basicprofile'],
            onLoad: this.onLinkedInLoad()
          });

          IN.Event.on(IN, "frameworkLoaded", () => {
            console.log ('inside frameworkLoaded');
            console.log (IN.User.isAuthorized());
            console.log (IN);
            // IN.API.Raw("/people/~").result( (res: any) => {
            //   console.log(res, 'from linked in provider');
            // });
          })

          // IN.User.authorize( () => {
          //   IN.API.Raw("/people/~:(id,first-name,last-name,email-address,picture-url)").result(function(res: any){
          //     console.log(res, 'from linked in provider');
          //   });
          // });
          // {res.firstName,res.lastName, res.emailAddress, uid: res.id, provider: "linkedIN", image: res.pictureUrl};
          // resolve(this.drawUser(res));
        });
    });
  }

  onLinkedInLoad() {
    console.log('bingo in load done');
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
      IN.User.authorize( () => {
        IN.API.Raw("/people/~:(id,first-name,last-name,email-address,picture-url)").result( (res: any) => {
          console.log(res, 'from linked in provider');
        });
      }, (err) => {
        console.log(err);
      });
      // return resolve(user);
      // IN.login((response: any) => {
      //   if (response.authResponse) {
      //     IN.API.Raw("/people/~:(id,first-name,last-name,email-address,picture-url)").result(function(res: any){
      //       resolve(this.drawUser(res));
      //     });
      //   }
      // }, { scope: 'email,public_profile' });
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
