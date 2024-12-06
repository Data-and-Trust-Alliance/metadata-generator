import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { iso31661, iso31662 } from 'iso-3166';
import { Location } from '@data-and-trust-alliance/metadata-reference';

@Component({
  selector: 'app-location-viewer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './location-viewer.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './location-viewer.component.css']
})
export class LocationViewerComponent {
  @Input() location!: Location;

  convertIso31661CodeToName(code: string) {
    var value = iso31661.find((country) => country.alpha2 === this.location.country);
    if(value) {
      return value.name;
    } else {
      return "";
    }
  };

  convertIso31662CodeToName(code: string) {
    var value = iso31662.find((state) => state.code === this.location.state);
    if(value) {
      return value.name;
    } else {
      return "";
    }
  };
}
