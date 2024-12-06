import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConfidentialityClassificationTool } from '../confidentiality-classification-tool';

@Component({
  selector: 'app-confidentiality-classification-data-facet-tool-entry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './confidentiality-classification-data-facet-tool-entry.component.html',
  styleUrl: '../../data-facet/data-facet.component.css'
})
export class ConfidentialityClassificationDataFacetToolEntryComponent {
  @Input() entry!: ConfidentialityClassificationTool;
  @Output() removeEntry = new EventEmitter<string>();

  removeTool(uuid:string) {
    this.removeEntry.emit(uuid);
  }
}
