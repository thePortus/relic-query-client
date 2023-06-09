import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {
  // event emitter
  @Output() successfullyAdded = new EventEmitter<string>();

  // loading flag & error messages
  loading: boolean = false;
  loadingError: boolean = false;
  errorMsgs: string[] = [];
  serverErrorMsgs: string[] = [];
  // observable and local object for user data
  userDetails$: Observable<User>;
  user: any;
  // stores uploaded file data & filename
  modelData: any;
  materialData: any;
  srcName: string;

  constructor(
    private _api: ApiService,
    private _user: UserService
  ) { }

  /**
   * Gets user details, gets all current people and institutions
   * from the server, for use in selecting people and institutions
   * to link.
   */
  ngOnInit(): void {
    // get user profile details
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
    this.loading = false;
  }

  /**
   * Ensures request meets basic validation and outputs client-side
   * error messages if it does not.
   * 
   * @param reqObject - The data JSON to be sent
   * @returns true if object is valid, otherwise null
   */
  private _validate(reqObject: any): boolean {
    var isValid = true;
    this.errorMsgs = [];
    if (reqObject.title == '' || reqObject.title.replace(/\s+/g, ' ') == ' ') {
      this.errorMsgs.push('Title cannot be blank or a space');
      isValid = false;
    }
    return isValid;
  }

  onModelSelected() {
    const inputNode: any = document.querySelector('#model');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.modelData = e.target.result;
      };
  
      reader.readAsText(inputNode.files[0]);
    }
  }

  onMaterialSelected() {
    const inputNode: any = document.querySelector('#material');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.materialData = e.target.result;
      };
  
      reader.readAsText(inputNode.files[0]);
    }
  }

  /**
   * Submits user data to server and stores local user data from server response.
   * 
   * @param form Form data
   */
  onSubmit(form: NgForm) {
    this.loading = true;
    var reqObject = {
      title: '',
      description: '',
      credits: '',
      model: '',
      material: ''
    };
    // copy values from form into request object
    Object.assign(reqObject, form.value);
    reqObject.model = this.modelData;
    reqObject.material = this.materialData;
    if (this._validate(reqObject)) {
      this._api.postTypeRequest('models', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          alert('Model successfully uploaded!');
          this.loading = false;
          this.successfullyAdded.emit(res);
        }
        else {
          this.serverErrorMsgs = res.messages;
          this.loadingError = true;
        }
      });
    }
  }

}
