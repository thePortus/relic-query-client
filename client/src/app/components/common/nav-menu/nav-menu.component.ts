import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './../../../services/auth.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  // event emitter to signal when nav menus selection made
  @Output() navMenuSelected = new EventEmitter<string>();

  // links for the nav menu, label is what displays, path is where it points
  // and booleans on if path requires user to be login, editor, or owner
  menuLinks = [{
    'label': 'Home',
    'path': '',
    'requiresLogin': false,
    'requiresEditor': false,
    'requiresOwner': false
  }, {
    'label': 'Models',
    'path': '/models',
    'requiresLogin': false,
    'requiresEditor': false,
    'requiresOwner': false
  }];
  // observable and local object for user data
  userDetails$: Observable<User>;
  user: any;

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _user: UserService
  ) { }

  ngOnInit(): void {
    // check local storage data whether user is already logged in
    this.isUserLogin();
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
  }

  /**
   * Uses auth service to see if user already has stored login data
   * in local storage. If so, then uses the user service to
   * store that data for the application.
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      const userDetails = JSON.parse(this._auth.getUserDetails()!);
      this._user.login({
        username: userDetails.username,
        email: userDetails.email,
        role: userDetails.role,
        token: userDetails.token
      });
    }
  }

  /**
   * Navigates router to specified path, calls event emitter to signal choice has been made.
   * 
   * @param path - URL of desired route
   */
  navigate(path: string) {
    this._router.navigate([path]);
    this.navMenuSelected.emit();
  }
  
  /**
   * Clears user data both from user service and from local storage
   */
  logout() {
    this._auth.clearStorage();
    this._user.logout();
    this._router.navigate(['']);
  }

}
