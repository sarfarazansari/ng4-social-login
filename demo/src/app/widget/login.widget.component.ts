import { Component, OnInit } from '@angular/core';

import {
  SocialLoginModule, AuthService,
  AuthServiceConfig, GoogleLoginProvider,
  FacebookLoginProvider, SocialUser, LinkedinLoginProvider
} from '../social/';

@Component({
  selector: 'login-widget',
  templateUrl: './login.widget.component.html',
  styleUrls: ['./login.widget.component.css']
})
export class LoginWidgetComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log('user:', user);
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithIN(): void{
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
