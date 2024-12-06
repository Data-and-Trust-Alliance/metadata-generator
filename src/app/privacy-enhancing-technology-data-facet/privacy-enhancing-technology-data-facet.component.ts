import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrivacyEnhancingTechnology } from '@data-and-trust-alliance/metadata-reference';

import { DataFacetComponent } from '../data-facet/data-facet.component';
import { PrivacyEnhancingTechnologyDataFacetEntryComponent } from './privacy-enhancing-technology-data-facet-entry/privacy-enhancing-technology-data-facet-entry.component';

@Component({
  selector: 'app-privacy-enhancing-technology-data-facet',
  standalone: true,
  imports: [DataFacetComponent, FormsModule, PrivacyEnhancingTechnologyDataFacetEntryComponent],
  templateUrl: './privacy-enhancing-technology-data-facet.component.html',
  styleUrl: '../data-facet/data-facet.component.css'
})
export class PrivacyEnhancingTechnologyDataFacetComponent extends DataFacetComponent {
  @Input() entries!: PrivacyEnhancingTechnology[];

  addEntry(event?: MouseEvent) {
    this.entries.push(PrivacyEnhancingTechnology.default());
  }

  removeEntry(uuid:string) {
    var index = 0;
    for(index = 0; index < this.entries.length; index++) {
      if(uuid === this.entries[index].uuid) {
        break;
      }
    };

    this.entries.splice(index, 1);
  }
}
