import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IntendedDataUse } from '@data-and-trust-alliance/metadata-reference';

import { DataFacetComponent } from '../data-facet/data-facet.component';
import { IntendedDataUseDataFacetEntryComponent } from './intended-data-use-data-facet-entry/intended-data-use-data-facet-entry.component';

@Component({
  selector: 'app-intended-data-use-data-facet',
  standalone: true,
  imports: [DataFacetComponent, FormsModule, IntendedDataUseDataFacetEntryComponent],
  templateUrl: './intended-data-use-data-facet.component.html',
  styleUrl: '../data-facet/data-facet.component.css'
})
export class IntendedDataUseDataFacetComponent extends DataFacetComponent {
  @Input() defaultNonAiEntries!: IntendedDataUse[];
  @Output() defaultNonAiEntriesChange = new EventEmitter();
  @Input() customNonAiEntries!: IntendedDataUse[];
  @Output() customNonAiEntriesChange = new EventEmitter();
  @Input() defaultAiEntries!: IntendedDataUse[];
  @Output() defaultAiEntriesChange = new EventEmitter();
  @Input() customAiEntries!: IntendedDataUse[];
  @Output() customAiEntriesChange = new EventEmitter();

  customNonAiEntriesEnabled: boolean = false;
  customAiEntriesEnabled: boolean = false;

  defaultNonAiEntrySelected: boolean = false;
  defaultAiEntrySelected: boolean = false;

  override validate() {
    // Validate that at least one selection has been made.
    this.anyDefaultEntrySelected();

    // If custom entries are enabled, there must be at least one entry.
    const customNonAiEntriesValid = (this.customNonAiEntriesEnabled && this.customNonAiEntries.length > 0);
    const customAiEntriesValid = (this.customAiEntriesEnabled && this.customAiEntries.length > 0);

    const selectionValid = this.defaultNonAiEntrySelected || this.defaultAiEntrySelected || customNonAiEntriesValid || customAiEntriesValid;

    this.dataFacetValid = selectionValid;
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  anyDefaultEntrySelected() {
    var initialValue = false;
    this.defaultNonAiEntrySelected = this.defaultNonAiEntries.map(
      (defaultEntry) => {
        return defaultEntry.enabled;
      }
    ).reduce(
      (accumulator, currentValue) => accumulator || currentValue,
      initialValue
    );

    this.defaultAiEntrySelected = this.defaultAiEntries.map(
      (defaultEntry) => {
        return defaultEntry.enabled;
      }
    ).reduce(
      (accumulator, currentValue) => accumulator || currentValue,
      initialValue
    );
  };

  addNonAiEntry(event?: MouseEvent) {
    this.customNonAiEntries.push(IntendedDataUse.customNonAiEntry());
    this.customNonAiEntriesChange.emit(this.customNonAiEntries);
  };

  addAiEntry(event?: MouseEvent) {
    this.customAiEntries.push(IntendedDataUse.customAiEntry());
    this.customAiEntriesChange.emit(this.customAiEntries);
  };

  removeNonAiEntry(uuid:string) {
    var index = 0;
    for(index = 0; index < this.customNonAiEntries.length; index++) {
      if(uuid === this.customNonAiEntries[index].uuid) {
        break;
      }
    };

    this.customNonAiEntries.splice(index, 1);
    this.customNonAiEntriesChange.emit(this.customNonAiEntries);
  };

  removeAiEntry(uuid:string) {
    var index = 0;
    for(index = 0; index < this.customAiEntries.length; index++) {
      if(uuid === this.customAiEntries[index].uuid) {
        break;
      }
    };

    this.customAiEntries.splice(index, 1);
    this.customAiEntriesChange.emit(this.customAiEntries);
  };

  handleCustomNonAiEntriesClear() {
    if(!this.customNonAiEntriesEnabled) {
      this.customNonAiEntries = [];
      this.customNonAiEntriesChange.emit(this.customNonAiEntries);
    }
  };

  handleCustomAiEntriesClear() {
    if(!this.customAiEntriesEnabled) {
      this.customAiEntries = [];
      this.customAiEntriesChange.emit(this.customAiEntries);
    }
  };
}
