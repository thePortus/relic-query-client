import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-detail-model',
  templateUrl: './detail-model.component.html',
  styleUrls: ['./detail-model.component.scss']
})
export class DetailModelComponent implements OnInit {
  @Input() modelId = '';

  // observable and local object for user data
  userDetails$: Observable<User>;
  user: any;
  // loading flag & error messages
  loading: boolean = true;
  loadingError: boolean = false;
  // download link for the files
  downloadModelHref: any;
  // storage for current item data from server
  protectedData: any;

  constructor(
    private _api: ApiService,
    private _user: UserService,
    private _router: Router,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Gets user details, fetches data from server.
   */
  ngOnInit(): void {
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
    this.update();
  }

  /**
   * Fetch item data from server, perform calculation of item totals, flattening of data,
   * and set .loading flag to false.
   */
  update() {
    this._api.getTypeRequest('models/' + this.modelId).subscribe((res: any) => {
      this.protectedData = res;
      let downloadFile = this.protectedData.modelData;
      this.downloadModelHref = this.sanitizer.bypassSecurityTrustUrl('data:text;charset=UTF-8,' + encodeURIComponent(downloadFile));
      this.loading = false;
    }, (error: any) => {
      this.loadingError = true;
    });
  }

  /**
   * Asks to confirm via alert. Then unlinks all linked items and finally
   * deletes the item itself. Navigates back to list of items.
   * 
   * @returns true
   */
  deleteItem() {
    if (confirm('Are you sure you delete this item? WARNING: CANNOT BE UNDONE!')) {
      this._api.deleteTypeRequest('models/' + this.modelId).subscribe((res:any) => {
        alert('Item successfully deleted!');
        this._router.navigate(['/models']);
      });
    }
    return true;
  }

}
