import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataFacetComponent } from '../../../data-facet/data-facet.component';

@Component({
  selector: 'app-simple-textarea-data-facet',
  standalone: true,
  imports: [DataFacetComponent, FormsModule],
  templateUrl: './simple-textarea-data-facet.component.html',
  styleUrl: '../../../data-facet/data-facet.component.css'
})
export class SimpleTextAreaDataFacetComponent extends DataFacetComponent {
  @Input() value!: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeholderText = "";

  @ViewChild("simpleTextArea") simpleTextArea: any;

  override validate() {
    this.dataFacetValid = !this.simpleTextArea.invalid;
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };
}
