import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SourceMetadata } from '../source-metadata';

@Component({
  selector: 'app-source-metadata-data-facet-entry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './source-metadata-data-facet-entry.component.html',
  styleUrl: '../../data-facet/data-facet.component.css'
})
export class SourceMetadataDataFacetEntryComponent {
  @Input() entry!: SourceMetadata;
  @Output() removeEntry = new EventEmitter<string>();

  removeSourceMetadata(uuid:string) {
    this.removeEntry.emit(uuid);
  }
}
