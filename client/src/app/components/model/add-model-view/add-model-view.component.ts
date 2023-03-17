import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * This is a view component which acts as a wrapper to a subwidget
 */
@Component({
  selector: 'app-add-model-view',
  templateUrl: './add-model-view.component.html',
  styleUrls: ['./add-model-view.component.scss']
})
export class AddModelViewComponent {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Event handler called when add widget emits an added item. Navigates
   * to the list view for items.
   * @param conference - Object containing added item info
   */
  itemAdded(item: any) {
    this._router.navigate(['/models/' + item.id.toString()]);
  }

}
