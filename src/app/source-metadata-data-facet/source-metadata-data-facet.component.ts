import { Component, Input } from '@angular/core';

import { DataFacetComponent } from '../data-facet/data-facet.component';
import { SourceMetadata } from './source-metadata';
import { SourceMetadataDataFacetEntryComponent } from './source-metadata-data-facet-entry/source-metadata-data-facet-entry.component';

@Component({
  selector: 'app-source-metadata-data-facet',
  standalone: true,
  imports: [DataFacetComponent, SourceMetadataDataFacetEntryComponent],
  templateUrl: './source-metadata-data-facet.component.html',
  styleUrl: '../data-facet/data-facet.component.css'
})
export class SourceMetadataDataFacetComponent extends DataFacetComponent {
  @Input() entries!: SourceMetadata[];

  addEntry(event?: MouseEvent) {
    this.entries.push(new SourceMetadata());
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
