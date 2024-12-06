import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Parameter } from '@data-and-trust-alliance/metadata-reference';

@Component({
  selector: 'app-parameter-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './parameter-editor.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './parameter-editor.component.css']
})
export class ParameterEditorComponent {
  @Input() parameter!: Parameter;
  @Output() parameterChange = new EventEmitter<Parameter>();
  @Output() copy = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
