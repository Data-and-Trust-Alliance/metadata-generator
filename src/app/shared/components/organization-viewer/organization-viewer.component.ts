import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressLine, Organization } from '@data-and-trust-alliance/metadata-reference';

import { AddressLineViewerComponent } from '../address-line-viewer/address-line-viewer.component';

@Component({
  selector: 'app-organization-viewer',
  standalone: true,
  imports: [AddressLineViewerComponent, FormsModule],
  templateUrl: './organization-viewer.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './organization-viewer.component.css']
})
export class OrganizationViewerComponent {
  @Input() organization!: Organization;
}
