import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressLine, Organization } from '@data-and-trust-alliance/metadata-reference';

import { AddressLineEditorComponent } from '../address-line-editor/address-line-editor.component';

@Component({
  selector: 'app-organization-editor',
  standalone: true,
  imports: [AddressLineEditorComponent, FormsModule],
  templateUrl: './organization-editor.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './organization-editor.component.css']
})
export class OrganizationEditorComponent {
  @Input() organization!: Organization;
  @Output() organizationChange = new EventEmitter<Organization>();
  @Output() copy = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  addAddressLine() {
    this.organization.addressLines.push(new AddressLine());
  };

  copyAddressLine(uuid: string) {
    var index = 0;
    for(index = 0; index < this.organization.addressLines.length; index++) {
      if(uuid === this.organization.addressLines[index].uuid) {
        break;
      }
    };

    // Copy the data.
    var duplicateAddressLine = new AddressLine();
    duplicateAddressLine.address = this.organization.addressLines[index].address;

    this.organization.addressLines.splice(index, 0, duplicateAddressLine);
  };

  removeAddressLine(uuid: string) {
    var index = 0;
    for(index = 0; index < this.organization.addressLines.length; index++) {
      if(uuid === this.organization.addressLines[index].uuid) {
        break;
      }
    };

    this.organization.addressLines.splice(index, 1);
  };
}
