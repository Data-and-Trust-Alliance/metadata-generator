import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Parameter, PrivacyEnhancingTechnology } from '@data-and-trust-alliance/metadata-reference';

import { CustomConceptEditorV2Component } from '../../shared/components/custom-concept-editor/custom-concept-editor-v2.component';
import { ParameterEditorComponent } from '../../shared/components/parameter-editor/parameter-editor.component';

@Component({
  selector: 'app-privacy-enhancing-technology-data-facet-entry',
  standalone: true,
  imports: [CustomConceptEditorV2Component, FormsModule, ParameterEditorComponent],
  templateUrl: './privacy-enhancing-technology-data-facet-entry.component.html',
  styleUrl: '../../data-facet/data-facet.component.css'
})
export class PrivacyEnhancingTechnologyDataFacetEntryComponent {
  @Input() entry!: PrivacyEnhancingTechnology;
  @Output() removeEntry = new EventEmitter<string>();

  customize: boolean = false;

  getDescriptions() {
    return PrivacyEnhancingTechnology.getDescriptions();
  };

  update() {
    var filteredOptions = PrivacyEnhancingTechnology.defaultOptions.filter(
      (option) => (option.description === this.entry.toolCategory.description)
    );

    if(filteredOptions.length === 0) {
      this.entry.toolCategory.code = "";
      this.entry.toolCategory.system = "";
      this.entry.toolCategory.description = "";
    } else {
      this.entry.toolCategory.code = filteredOptions[0].code;
      this.entry.toolCategory.system = PrivacyEnhancingTechnology.defaultSystem;
      this.entry.toolCategory.description = filteredOptions[0].description;
    }
  };

  removePrivacyEnhancingTechnology(uuid:string) {
    this.removeEntry.emit(uuid);
  };

  addParameter() {
    this.entry.parameters.push(Parameter.default());
  };

  copyParameter(uuid: string) {
    var index = 0;
    for(index = 0; index < this.entry.parameters.length; index++) {
      if(uuid === this.entry.parameters[index].uuid) {
        break;
      }
    };

    // Copy the data.
    var duplicateParameter = Parameter.default();
    duplicateParameter.key = this.entry.parameters[index].key;
    duplicateParameter.value = this.entry.parameters[index].value;

    this.entry.parameters.splice(index, 0, duplicateParameter);
  };

  removeParameter(uuid: string) {
    var index = 0;
    for(index = 0; index < this.entry.parameters.length; index++) {
      if(uuid === this.entry.parameters[index].uuid) {
        break;
      }
    };

    this.entry.parameters.splice(index, 1);
  };
}
