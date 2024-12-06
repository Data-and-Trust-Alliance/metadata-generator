import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressLine } from '@data-and-trust-alliance/metadata-reference';

@Component({
  selector: 'app-address-line-viewer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './address-line-viewer.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './address-line-viewer.component.css']
})
export class AddressLineViewerComponent {
  @Input() addressLine!: AddressLine;
}
