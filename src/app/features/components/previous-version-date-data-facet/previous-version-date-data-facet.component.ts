import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SimpleDateDataFacetComponent } from '../simple-date-data-facet/simple-date-data-facet.component';

@Component({
  selector: 'app-previous-version-date-data-facet',
  standalone: true,
  imports: [FormsModule, SimpleDateDataFacetComponent],
  templateUrl: './previous-version-date-data-facet.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', '../simple-date-data-facet/simple-date-data-facet.component.css']
})
export class PreviousVersionDateDataFacetComponent extends SimpleDateDataFacetComponent {
  previousVersionNotAvailable = false;

  handleCheckboxUpdate() {
    if(this.previousVersionNotAvailable) {
      this.value = "";
      this.valueChange.emit(this.value);
    }
  };
}
