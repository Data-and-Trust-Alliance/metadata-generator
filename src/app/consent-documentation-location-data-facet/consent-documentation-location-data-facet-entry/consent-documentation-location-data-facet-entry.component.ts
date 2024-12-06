import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConsentDocumentationLocation } from '../consent-documentation-location';

@Component({
  selector: 'app-consent-documentation-location-data-facet-entry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './consent-documentation-location-data-facet-entry.component.html',
  styleUrl: '../../data-facet/data-facet.component.css'
})
export class ConsentDocumentationLocationDataFacetEntryComponent {
  @Input() entry!: ConsentDocumentationLocation;
  @Input() placeholderText!: string;
  @Output() removeEntry = new EventEmitter<string>();

  removeConsentDocumentationLocation(uuid:string) {
    this.removeEntry.emit(uuid);
  }
}
