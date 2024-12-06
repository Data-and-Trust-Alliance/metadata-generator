import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConsentDocumentationLocation } from './consent-documentation-location';
import { ConsentDocumentationLocationDataFacetEntryComponent } from './consent-documentation-location-data-facet-entry/consent-documentation-location-data-facet-entry.component';
import { DataFacetComponent } from '../data-facet/data-facet.component';

@Component({
  selector: 'app-consent-documentation-location-data-facet',
  standalone: true,
  imports: [ConsentDocumentationLocationDataFacetEntryComponent, DataFacetComponent, FormsModule],
  templateUrl: './consent-documentation-location-data-facet.component.html',
  styleUrl: '../data-facet/data-facet.component.css'
})
export class ConsentDocumentationLocationDataFacetComponent extends DataFacetComponent {
  @Input() entries!: ConsentDocumentationLocation[];
  @Input() placeholderText: string = "";

  addEntry(event?: MouseEvent) {
    this.entries.push(new ConsentDocumentationLocation());
  };

  removeEntry(uuid:string) {
    var index = 0;
    for(index = 0; index < this.entries.length; index++) {
      if(uuid === this.entries[index].uuid) {
        break;
      }
    };

    this.entries.splice(index, 1);
  };
}
