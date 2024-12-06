import { Component } from '@angular/core';

import { DataFacetComponent } from '../data-facet/data-facet.component'

@Component({
  selector: 'app-standards-version-data-facet',
  standalone: true,
  imports: [DataFacetComponent],
  templateUrl: './standards-version-data-facet.component.html',
  styleUrl: '../data-facet/data-facet.component.css'
})
export class StandardsVersionDataFacetComponent extends DataFacetComponent {
  versions = [
    {id: 0, name: "1.0.0"}
  ];
}
