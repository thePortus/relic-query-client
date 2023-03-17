import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-list-model',
  templateUrl: './list-model.component.html',
  styleUrls: ['./list-model.component.scss']
})
export class ListModelComponent {
  // id of items from server to list
  protectedData: any[] = [];
  // total count of items
  totalItems: any;
  // strings to filter results by (server-side)
  filterByTitle: any;
  filterFields = [{
    keyword: 'title',
    label: 'Title'
  }];
    // pagination data
  currentPage = 1;
  itemsPerPage = 5;
  // loading & error messages
  loading: boolean = true;
  loadingError: boolean = false;

  constructor(
    private _api: ApiService,
    private _router: Router
  ) { }

  /**
   * Initialize pagination data and refresh data from server.
   */
    ngOnInit(): void {
      this.currentPage = 1;
      this.refreshData();
    }
  
    /**
     * Navigates router to specific sub item via specified path
     * 
     * @param path - path to item
     */
    navigate(path: string) {
      this._router.navigate(['/models/' + path]);
    }

  /**
   * Executed upon event emission by child filter widget. Copies
   * data from emitted object to filter fields.
   * 
   * @param filterInfo - Object with fields corresponding to each filter
   */
  updateFilter(filterInfo: any) {
    this.filterByTitle = filterInfo.title;
    this.refreshData();
  }

/**
   * Executed upon event emission from child pagination widget.
   * Gets PageEvent from child widget and applies it to
   * component, then refreshes data.
   * 
   * @param e - PageEvent containing new index and size
   */
changePagination(e: PageEvent) {
  this.currentPage = e.pageIndex + 1;
  this.itemsPerPage = e.pageSize;
  this.refreshData();
}

/**
 * Gets data from server (replacing any previously fetched data).
 * First builds the request string, which will include current pagination
 * information, as well as any specified filter strings for server-side
 * filtering. Then performs the request, stores the data, and sets .loading
 * to false.
 */
refreshData() {
  let requestString: string = 'models/?';
  requestString += 'page=' + (this.currentPage - 1) +  '&size=' + this.itemsPerPage;
  if (this.filterByTitle) {
    requestString += '&title=' + this.filterByTitle;
  }
  this._api.getTypeRequest(requestString).subscribe((res: any) => {
    this.protectedData = res.rows;
    this.totalItems = res.count;
    this.loading = false;
  }, (error: any) => {
    this.loadingError = true;
  });
}

}
