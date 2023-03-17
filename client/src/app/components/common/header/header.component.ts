import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Settings } from '../../../app.settings';

import { AuthService } from './../../../services/auth.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() navMenuToggle = new EventEmitter<string>();

  // general app settings, for title and credit info
  settings = Settings;
  menuLinks = [
    {
      'label': 'Home',
      'path': ''
    }, {
      'label': 'Models',
      'path': '/models'
    }
  ];
  userDetails$: Observable<User>;
  user: any;

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _user: UserService
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      const userDetails = JSON.parse(this._auth.getUserDetails() || '');
      this._user.login({
        username: userDetails.username,
        email: userDetails.email,
        role: userDetails.role,
        token: userDetails.token
      })
    }
  }

  /**
   * Navigates router to specified path
   * 
   * @param path - URL of desired route
   */
  navigate(path: string) {
    this._router.navigate([path]);
  }

  logout() {
    this._auth.clearStorage();
    this._user.logout();
    this._router.navigate(['']);
  }

}
