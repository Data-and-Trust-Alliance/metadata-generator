import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataFacetComponent } from '../../../data-facet/data-facet.component';

@Component({
  selector: 'app-data-generation-date-range-data-facet',
  standalone: true,
  imports: [DataFacetComponent, FormsModule],
  templateUrl: './data-generation-date-range-data-facet.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css']
})
export class DataGenerationDateRangeDataFacetComponent extends DataFacetComponent {
  @Input() start!: string;
  @Output() startChange = new EventEmitter<string>();
  @Input() end!: string;
  @Output() endChange = new EventEmitter<string>();
  @Input() placeholderText = "";

  @ViewChild("startInput") startInput: any;
  @ViewChild("endInput") endInput: any;

  override validate() {
    this.dataFacetValid = (!this.startInput.invalid) && (!this.endInput.invalid) && !(this.dataFacetRequired && (!this.dateValid(this.start) || !this.dateValid(this.end))) && this.dateRangeValid(this.start, this.end);
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  dateValid(date: string) {
    return (new Date(date)).getTime() > 0;
  };

  dateRangeValid(start: string, end: string) {
    if(start !== "" && end !== "") {
      return (((new Date(start)).getTime()) <= ((new Date(end)).getTime()));
    } else {
      return true;
    }
  };
}
