import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-model-view',
  templateUrl: './detail-model-view.component.html',
  styleUrls: ['./detail-model-view.component.scss']
})
export class DetailModelViewComponent implements OnInit {
    // item id & loading flag
    modelId: any;
    loading: boolean = true;

    constructor(
      private _route: ActivatedRoute
    ) { }
  
    /**
     * Gets item ID from route snapeshot and sets .loading to false
     */
    ngOnInit(): void {
      this.modelId = this._route.snapshot.paramMap.get('id');
      this.loading = false;
    }

}
