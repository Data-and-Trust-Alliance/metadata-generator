import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataFacetComponent } from '../../../data-facet/data-facet.component';

@Component({
  selector: 'app-simple-date-data-facet',
  standalone: true,
  imports: [DataFacetComponent, FormsModule],
  templateUrl: './simple-date-data-facet.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './simple-date-data-facet.component.css']
})
export class SimpleDateDataFacetComponent extends DataFacetComponent {
  @Input() value!: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeholderText = "";

  @ViewChild("simpleInput") simpleInput: any;

  override validate() {
    this.dataFacetValid = (!this.simpleInput.invalid) && !(this.dataFacetRequired && !this.dateValid(this.value));
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  dateValid(date: string) {
    return (new Date(date)).getTime() > 0;
  };
}
