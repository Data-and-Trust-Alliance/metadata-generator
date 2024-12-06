import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfidentialityClassification } from '@data-and-trust-alliance/metadata-reference';

import { ConfidentialityClassificationDataFacetEntryComponent } from './confidentiality-classification-data-facet-entry/confidentiality-classification-data-facet-entry.component';
import { ConfidentialityClassificationDataFacetToolEntryComponent } from './confidentiality-classification-data-facet-tool-entry/confidentiality-classification-data-facet-tool-entry.component';
import { ConfidentialityClassificationTool } from './confidentiality-classification-tool';
import { DataFacetComponent } from '../data-facet/data-facet.component';

@Component({
  selector: 'app-confidentiality-classification-data-facet',
  standalone: true,
  imports: [ConfidentialityClassificationDataFacetEntryComponent, ConfidentialityClassificationDataFacetToolEntryComponent, DataFacetComponent, FormsModule],
  templateUrl: './confidentiality-classification-data-facet.component.html',
  styleUrl: '../data-facet/data-facet.component.css'
})
export class ConfidentialityClassificationDataFacetComponent extends DataFacetComponent {
  @Input() defaultEntries!: ConfidentialityClassification[];
  @Output() defaultEntriesChange = new EventEmitter();
  @Input() customEntries!: ConfidentialityClassification[];
  @Output() customEntriesChange = new EventEmitter();
  @Input() tools!: ConfidentialityClassificationTool[];
  @Output() toolsChange = new EventEmitter();
  customEntriesEnabled: boolean = false;
  noneEnabled: boolean = false;
  defaultEntrySelected: boolean = false;

  override validate() {
    // Validate that at least one selection has been made.
    this.anyDefaultEntrySelected();

    // If custom entries are enabled, there must be at least one entry.
    const customEntriesValid = (this.customEntriesEnabled && this.customEntries.length > 0);

    const selectionValid = this.noneEnabled || this.defaultEntrySelected || customEntriesValid;

    this.dataFacetValid = selectionValid;
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  anyDefaultEntrySelected() {
    var initialValue = false;
    this.defaultEntrySelected = this.defaultEntries.map(
      (defaultEntry) => {
        return defaultEntry.enabled;
      }
    ).reduce(
      (accumulator, currentValue) => accumulator || currentValue,
      initialValue
    );
  };

  addEntry(event?: MouseEvent) {
    this.customEntries.push(ConfidentialityClassification.default());
    this.customEntriesChange.emit(this.customEntries);
  };

  addTool(event?: MouseEvent) {
    this.tools.push(new ConfidentialityClassificationTool());
    this.toolsChange.emit(this.tools);
  };

  removeEntry(uuid:string) {
    var index = 0;
    for(index = 0; index < this.customEntries.length; index++) {
      if(uuid === this.customEntries[index].uuid) {
        break;
      }
    };

    this.customEntries.splice(index, 1);
    this.customEntriesChange.emit(this.customEntries);
  };

  removeTool(uuid:string) {
    var index = 0;
    for(index = 0; index < this.tools.length; index++) {
      if(uuid === this.tools[index].uuid) {
        break;
      }
    };

    this.tools.splice(index, 1);
    this.toolsChange.emit(this.tools);
  };

  clearCustomEntries() {
    this.customEntriesEnabled = false;
    this.customEntries = [];
    this.customEntriesChange.emit(this.customEntries);
  };

  handleCheckboxChange(label: string) {
    if(label === "None") {
      if(this.noneEnabled) {
        // Clear and disable all other options.
        this.defaultEntries.forEach(
          (entry) => {
            entry.enabled = false;
          }
        );
        this.clearCustomEntries();
      }
    } else {
      // A different checkbox was selected, disable "None" checkbox.
      this.noneEnabled = false;

      // Check if one should clear the custom entries.
      if(!this.customEntriesEnabled) {
        this.customEntries = [];
        this.customEntriesChange.emit(this.customEntries);
      }
    }

    // Update flag for aggregate default entry selection.
    this.anyDefaultEntrySelected();
  };
}
