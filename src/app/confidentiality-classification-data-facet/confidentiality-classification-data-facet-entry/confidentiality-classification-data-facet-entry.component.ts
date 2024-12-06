import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfidentialityClassification } from '@data-and-trust-alliance/metadata-reference';

import { CustomConceptEditorV2Component } from '../../shared/components/custom-concept-editor/custom-concept-editor-v2.component';

@Component({
  selector: 'app-confidentiality-classification-data-facet-entry',
  standalone: true,
  imports: [CustomConceptEditorV2Component, FormsModule],
  templateUrl: './confidentiality-classification-data-facet-entry.component.html',
  styleUrl: '../../data-facet/data-facet.component.css'
})
export class ConfidentialityClassificationDataFacetEntryComponent {
  @Input() entry!: ConfidentialityClassification;
  @Output() removeEntry = new EventEmitter<string>();

  removeConfidentialityClassification(uuid:string) {
    this.removeEntry.emit(uuid);
  }
}
