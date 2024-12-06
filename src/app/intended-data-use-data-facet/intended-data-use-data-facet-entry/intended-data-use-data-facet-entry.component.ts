import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IntendedDataUse } from '@data-and-trust-alliance/metadata-reference';

import { CustomConceptEditorV2Component } from '../../shared/components/custom-concept-editor/custom-concept-editor-v2.component';

@Component({
  selector: 'app-intended-data-use-data-facet-entry',
  standalone: true,
  imports: [CustomConceptEditorV2Component, FormsModule],
  templateUrl: './intended-data-use-data-facet-entry.component.html',
  styleUrl: '../../data-facet/data-facet.component.css'
})
export class IntendedDataUseDataFacetEntryComponent {
  @Input() entry!: IntendedDataUse;
  @Output() removeEntry = new EventEmitter<string>();

  removeIntendedDataUse(uuid:string) {
    this.removeEntry.emit(uuid);
  }
}
