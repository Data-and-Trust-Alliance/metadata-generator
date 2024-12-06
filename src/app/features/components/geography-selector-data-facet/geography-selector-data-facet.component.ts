import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@data-and-trust-alliance/metadata-reference';

import { DataFacetComponent } from '../../../data-facet/data-facet.component';
import { LocationEditorComponent } from '../../../shared/components/location-editor/location-editor.component';
import { LocationViewerComponent } from '../../../shared/components/location-viewer/location-viewer.component';

@Component({
  selector: 'app-geography-selector-data-facet',
  standalone: true,
  imports: [DataFacetComponent, FormsModule, LocationEditorComponent, LocationViewerComponent],
  templateUrl: './geography-selector-data-facet.component.html',
  styleUrl: '../../../data-facet/data-facet.component.css'
})
export class GeographySelectorDataFacetComponent extends DataFacetComponent {
  @Input() locations!: Location[];
  @Output() locationsChange = new EventEmitter<object>();
  @Input() addButtonText!: string;
  @Input() exclusionEnabled: boolean = false;
  @Input() replicateEnabled: boolean = false;
  @Input() replicateText: string = "";
  @Output() replicateChange = new EventEmitter<boolean>();
  replicateFromOtherSource = false;

  @Input() minimumNumberOfLocations: number = 0;

  override validate() {
    this.dataFacetValid = (this.locations.length >= this.minimumNumberOfLocations);
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  replicateFromOtherSourceUpdated(replicate: boolean) {
    this.replicateChange.emit(replicate);
  };

  addEntry(event?: MouseEvent) {
    this.locations.push(Location.default());
  };

  copyEntry(uuid: string) {
    var index = 0;
    for(index = 0; index < this.locations.length; index++) {
      if(uuid === this.locations[index].uuid) {
        break;
      }
    };

    // Copy the location data.
    var duplicateLocation = Location.default();
    duplicateLocation.country = this.locations[index].country;
    duplicateLocation.state = this.locations[index].state;
    duplicateLocation.inclusion = this.locations[index].inclusion;

    this.locations.splice(index, 0, duplicateLocation);
  };

  removeEntry(uuid: string) {
    var index = 0;
    for(index = 0; index < this.locations.length; index++) {
      if(uuid === this.locations[index].uuid) {
        break;
      }
    };

    this.locations.splice(index, 1);
  };
}
