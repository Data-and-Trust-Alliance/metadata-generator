import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { iso31661, iso31662, ISO31662Entry } from 'iso-3166';
import { Location } from '@data-and-trust-alliance/metadata-reference';

@Component({
  selector: 'app-location-editor',
  standalone: true,
  imports: [FormsModule, SelectDropDownModule],
  templateUrl: './location-editor.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './location-editor.component.css']
})
export class LocationEditorComponent {
  @Input() location!: Location;
  @Output() locationChange = new EventEmitter<Location>();
  @Input() exclusionEnabled: boolean = false;
  @Output() copy = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  enableStateField = false;
  countrySelect: any = null;
  stateSelect: any = null;

  config = {
    displayKey: "name",
    height: "400px",
    search: true
  };

  countryOptions = iso31661;
  stateOptions: ISO31662Entry[] = [];

  countryUpdated() {
    this.location.country = this.countrySelect.alpha2;
    this.location.state = "";
    this.locationChange.emit(this.location);

    this.stateSelect = null;
    this.stateOptions = iso31662.filter((state) => state.parent === this.countrySelect.alpha2);
  };

  stateUpdated() {
    this.location.state = this.stateSelect.code;
    this.locationChange.emit(this.location);
  };

  addSubregion() {
    this.enableStateField = true;
  };

  removeSubregion() {
    this.enableStateField = false;
    this.stateSelect = null;
    this.location.state = "";
    this.locationChange.emit(this.location);
  };
}
