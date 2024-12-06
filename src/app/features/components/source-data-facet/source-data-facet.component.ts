import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Organization } from '@data-and-trust-alliance/metadata-reference';

import { DataIssuerDataFacetComponentV2 } from '../data-issuer-data-facet/data-issuer-data-facet.component';
import { OrganizationEditorComponent } from '../../../shared/components/organization-editor/organization-editor.component';
import { OrganizationViewerComponent } from '../../../shared/components/organization-viewer/organization-viewer.component';

@Component({
  selector: 'app-source-data-facet-v2',
  standalone: true,
  imports: [DataIssuerDataFacetComponentV2, FormsModule, OrganizationEditorComponent, OrganizationViewerComponent],
  templateUrl: './source-data-facet.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', '../data-issuer-data-facet/data-issuer-data-facet.component.css', './source-data-facet.component.css']
})
export class SourceDataFacetComponentV2 extends DataIssuerDataFacetComponentV2 {
  @Input() dataIssuers!: Organization[];
  @Input() useDataIssuerAsSource!: boolean;
  @Output() useDataIssuerAsSourceChange = new EventEmitter<boolean>();

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

    this.dataFacetValid = organizationNamesValid;
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };
}
