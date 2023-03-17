import { Component } from '@angular/core';

import { Settings } from '../../../app.settings';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  // app settings
  settings = Settings;

}
