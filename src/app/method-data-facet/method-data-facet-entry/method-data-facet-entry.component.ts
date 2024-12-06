import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Method } from '@data-and-trust-alliance/metadata-reference';

import { CustomConceptEditorV2Component } from '../../shared/components/custom-concept-editor/custom-concept-editor-v2.component';

@Component({
  selector: 'app-method-data-facet-entry',
  standalone: true,
  imports: [CustomConceptEditorV2Component, FormsModule],
  templateUrl: './method-data-facet-entry.component.html',
  styleUrl: '../../data-facet/data-facet.component.css'
})
export class MethodDataFacetEntryComponent {
  @Input() entry!: Method;
  @Output() removeEntry = new EventEmitter<string>();

  customize: boolean = false;

  getMethodCategories() {
    return Method.getMethodCategories();
  };

  getSpecificUses(categoryText: string) {
    return Method.getSpecificUses(categoryText);
  };

  update() {
    var filteredOptions = Method.defaultOptions.filter(
      (option) => (option.categoryText === this.entry.methodCategory && option.specificUseText === this.entry.specificUse)
    );

    if(filteredOptions.length === 0) {
      this.entry.code = "";
      this.entry.system = "";
      this.entry.description = "";
    } else {
      this.entry.code = filteredOptions[0].code;
      this.entry.system = Method.defaultSystem;
      this.entry.description = Method.getDefaultDescription(filteredOptions[0].categoryText, filteredOptions[0].specificUseText);
    }

    this.customize = (this.entry.methodCategory === "Other" || this.entry.specificUse === "Other");
  };

  removeMethod(uuid:string) {
    this.removeEntry.emit(uuid);
  };
}
