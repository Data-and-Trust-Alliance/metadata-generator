import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-facet',
  standalone: true,
  imports: [],
  templateUrl: './data-facet.component.html',
  styleUrl: './data-facet.component.css'
})
export class DataFacetComponent {
  @Input() dataFacetValid!: boolean;
  @Output() dataFacetValidChange = new EventEmitter();
  @Input() dataFacetEnabled = false;
  @Input() dataFacetRequired = true;
  @Input() dataFacetLabel = "0";
  @Input() dataFacetDescription: string = "";
  showDataFacetDescription: boolean = false;

  @ViewChild("dataFacet") dataFacet!: ElementRef;

  validate() {
    this.dataFacetValid = true;
    this.dataFacetValidChange.emit(this.dataFacetValid);
  };

  scroll() {
    this.dataFacet.nativeElement.scrollIntoView(
      {
        behavior: "smooth",
        block: "start"
      }
    );
  };
}
