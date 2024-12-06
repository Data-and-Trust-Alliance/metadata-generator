import { Component, Input } from '@angular/core';
import { Method } from '@data-and-trust-alliance/metadata-reference';

import { DataFacetComponent } from '../data-facet/data-facet.component';
import { MethodDataFacetEntryComponent } from './method-data-facet-entry/method-data-facet-entry.component';

@Component({
  selector: 'app-method-data-facet',
  standalone: true,
  imports: [DataFacetComponent, MethodDataFacetEntryComponent],
  templateUrl: './method-data-facet.component.html',
  styleUrl: '../data-facet/data-facet.component.css'
})
export class MethodDataFacetComponent extends DataFacetComponent {
  @Input() methods!: Method[];

  override validate() {
    this.dataFacetValid = (this.methods.length > 0);
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  addEntry(event?: MouseEvent) {
    this.methods.push(Method.default());
  };

  removeEntry(uuid:string) {
    var index = 0;
    for(index = 0; index < this.methods.length; index++) {
      if(uuid === this.methods[index].uuid) {
        break;
      }
    };

    this.methods.splice(index, 1);
  };
}
