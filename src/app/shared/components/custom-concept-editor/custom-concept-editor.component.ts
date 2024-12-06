import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Concept } from '@data-and-trust-alliance/metadata-reference';

@Component({
  selector: 'app-custom-concept-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-concept-editor.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './custom-concept-editor.component.css']
})
export class CustomConceptEditorComponent {
  @Input() concept!: Concept;
  @Output() conceptChange = new EventEmitter();
  @Input() customize: boolean = false;
  @Output() customizeChange = new EventEmitter();

  displayCode: boolean = false;
  displaySystem: boolean = false;
  displayDescription: boolean = true;

  labelTextCode: string = "Code";
  labelTextSystem: string = "System";
  labelTextDescription: string = "Description";

  placeholderTextCode: string = "Enter custom code";
  placeholderTextSystem: string = "Enter system URI";
  placeholderTextDescription: string = "Enter description";

  autogenerateCode: boolean = true;

  descriptionUpdated(description: string) {
    if(this.autogenerateCode) {
      this.concept.code = Concept.generateCode(description);
    }

    this.conceptChange.emit(this.concept);
  };
}
