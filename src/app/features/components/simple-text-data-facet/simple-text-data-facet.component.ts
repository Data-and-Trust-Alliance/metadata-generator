import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataFacetComponent } from '../../../data-facet/data-facet.component';

@Component({
  selector: 'app-simple-text-data-facet',
  standalone: true,
  imports: [DataFacetComponent, FormsModule],
  templateUrl: './simple-text-data-facet.component.html',
  styleUrl: '../../../data-facet/data-facet.component.css'
})
export class SimpleTextDataFacetComponent extends DataFacetComponent {
  @Input() value!: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeholderText = "";

  @ViewChild("simpleInput") simpleInput: any;

  override validate() {
    this.dataFacetValid = !this.simpleInput.invalid;
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };
}
