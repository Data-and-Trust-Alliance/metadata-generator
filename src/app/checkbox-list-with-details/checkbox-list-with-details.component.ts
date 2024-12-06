import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxDetailsEntry } from './checkbox-details-entry';
import { CheckboxOptionWithDetails } from './checkbox-option-with-details';
import { DataFacetComponent } from '../data-facet/data-facet.component';

@Component({
  selector: 'app-checkbox-list-with-details',
  standalone: true,
  imports: [DataFacetComponent, FormsModule],
  templateUrl: './checkbox-list-with-details.component.html',
  styleUrl: '../data-facet/data-facet.component.css'
})
export class CheckboxListWithDetailsComponent extends DataFacetComponent {
  @Input() checkboxInstructions!: string;
  @Input() checkboxOptions!: CheckboxOptionWithDetails[];

  checkboxSelected: boolean = false;

  override validate() {
    // Validate that at least one selection has been made.
    this.anyCheckboxSelected();

    // Validate that the details for each checkbox option have a value if needed.
    var initialValue = true;
    const detailsValid = this.checkboxOptions.map(
      (checkboxOption) => {
        return !checkboxOption.enabled || !checkboxOption.detailsEnabled || (
          checkboxOption.detailsEntries.length > 0 && (
            checkboxOption.detailsEntries.map(
              (detailsEntry) => {
                return (detailsEntry.value !== "");
              }
            ).reduce(
              (accumulator, currentValue) => accumulator && currentValue,
              initialValue
            )
          )
        );
      }
    ).reduce(
      (accumulator, currentValue) => accumulator && currentValue,
      initialValue
    );

    this.dataFacetValid = this.checkboxSelected && detailsValid;
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  anyCheckboxSelected() {
    var initialValue = false;
    this.checkboxSelected = this.checkboxOptions.map(
      (checkboxOption) => {
        return checkboxOption.enabled;
      }
    ).reduce(
      (accumulator, currentValue) => accumulator || currentValue,
      initialValue
    );
  };

  addEntry(checkboxOptionUuid: string) {
    // Identify correct checkbox option.
    var checkboxOptionIndex = 0;
    for(checkboxOptionIndex = 0; checkboxOptionIndex < this.checkboxOptions.length; checkboxOptionIndex++) {
      if(checkboxOptionUuid === this.checkboxOptions[checkboxOptionIndex].uuid) {
        break;
      }
    };

    this.checkboxOptions[checkboxOptionIndex].detailsEntries.push(new CheckboxDetailsEntry());
  };

  removeDetails(checkboxOptionUuid: string, detailsUuid: string) {
    // Identify correct checkbox option.
    var checkboxOptionIndex = 0;
    for(checkboxOptionIndex = 0; checkboxOptionIndex < this.checkboxOptions.length; checkboxOptionIndex++) {
      if(checkboxOptionUuid === this.checkboxOptions[checkboxOptionIndex].uuid) {
        break;
      }
    };

    // Identify correct details entry.
    var detailsIndex = 0;
    for(detailsIndex = 0; detailsIndex < this.checkboxOptions[checkboxOptionIndex].detailsEntries.length; detailsIndex++) {
      if(detailsUuid === this.checkboxOptions[checkboxOptionIndex].detailsEntries[detailsIndex].uuid) {
        break;
      }
    };

    this.checkboxOptions[checkboxOptionIndex].detailsEntries.splice(detailsIndex, 1);
  };

  handleNoneSelected(label: string) {
    if(label === "None") {
      if(this.optionNoneEnabled()) {
        // Clear and disable all other options.
        this.checkboxOptions.filter(
          (checkboxOption) => checkboxOption.label !== "None"
        ).forEach(
          (checkboxOption) => {
            checkboxOption.enabled = false;
            checkboxOption.detailsEntries = [];
          }
        );
      }
    } else {
      // A different checkbox was selected, disable "None" checkbox.
      this.checkboxOptions.filter(
        (checkboxOption) => checkboxOption.label === "None"
      ).forEach(
        (checkboxOption) => checkboxOption.enabled = false
      );
    }

    // Update flag for aggregate selection status.
    this.anyCheckboxSelected();
  };

  optionNoneEnabled() {
    return this.checkboxOptions.filter(
      (checkboxOption) => checkboxOption.label === "None"
    ).map(
      (checkboxOption) => checkboxOption.enabled
    );
  };
}
