import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressLine } from '@data-and-trust-alliance/metadata-reference';

@Component({
  selector: 'app-address-line-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './address-line-editor.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './address-line-editor.component.css']
})
export class AddressLineEditorComponent {
  @Input() addressLine!: AddressLine;
  @Output() addressLineChange = new EventEmitter<AddressLine>();
  @Output() copy = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
