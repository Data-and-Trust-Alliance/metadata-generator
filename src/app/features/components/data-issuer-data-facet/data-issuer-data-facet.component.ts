import { Component, Input } from '@angular/core';
import { Organization } from '@data-and-trust-alliance/metadata-reference';

import { DataFacetComponent } from '../../../data-facet/data-facet.component';
import { OrganizationEditorComponent } from '../../../shared/components/organization-editor/organization-editor.component';

@Component({
  selector: 'app-data-issuer-data-facet-v2',
  standalone: true,
  imports: [OrganizationEditorComponent],
  templateUrl: './data-issuer-data-facet.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './data-issuer-data-facet.component.css']
})
export class DataIssuerDataFacetComponentV2 extends DataFacetComponent {
  @Input() organizations!: Organization[];

  override validate() {
    var initialValue = true;
    // Validate that each organization has a name.
    const organizationNamesValid = this.organizations.map(
      (organization) => {
        return (organization.name !== "");
      }
    ).reduce(
      (accumulator, currentValue) => accumulator && currentValue,
      initialValue
    );

    this.dataFacetValid = organizationNamesValid && (this.organizations.length > 0);
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  addOrganization() {
    this.organizations.push(new Organization());
  };

  copyOrganization(uuid: string) {
    var index = 0;
    for(index = 0; index < this.organizations.length; index++) {
      if(uuid === this.organizations[index].uuid) {
        break;
      }
    };

    // Copy the data.
    this.organizations.splice(index, 0, Organization.copy(this.organizations[index]));
  };

  removeOrganization(uuid: string) {
    var index = 0;
    for(index = 0; index < this.organizations.length; index++) {
      if(uuid === this.organizations[index].uuid) {
        break;
      }
    };

    this.organizations.splice(index, 1);
  };
}
