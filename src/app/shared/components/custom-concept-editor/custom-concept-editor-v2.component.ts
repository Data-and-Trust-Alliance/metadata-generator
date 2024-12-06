import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Concept } from '@data-and-trust-alliance/metadata-reference';

@Component({
  selector: 'app-custom-concept-editor-v2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-concept-editor-v2.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './custom-concept-editor.component.css']
})
export class CustomConceptEditorV2Component {
  @Input() concept!: Concept;
  @Output() conceptChange = new EventEmitter();

  @Input() displayCode: boolean = false;
  @Input() displaySystem: boolean = false;
  @Input() displayDescription: boolean = true;

  @Input() labelTextCode: string = "Code";
  @Input() labelTextSystem: string = "System";
  @Input() labelTextDescription: string = "Description";

  @Input() placeholderTextCode: string = "Enter custom code";
  @Input() placeholderTextSystem: string = "Enter system URI";
  @Input() placeholderTextDescription: string = "Enter description";

  @Input() autogenerateCode: boolean = true;

  descriptionUpdated(description: string) {
    if(this.autogenerateCode) {
      this.concept.code = Concept.generateCode(description);
    }

    this.conceptChange.emit(this.concept);
  };
}
