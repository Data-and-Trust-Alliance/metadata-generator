import { Component, Input } from '@angular/core';
import { DataFormat } from '@data-and-trust-alliance/metadata-reference';

import { DataFacetComponent } from '../../../data-facet/data-facet.component';
import { DataFormatEditorComponent } from '../data-format-editor/data-format-editor.component';

@Component({
  selector: 'app-data-format-data-facet-v2',
  standalone: true,
  imports: [DataFormatEditorComponent],
  templateUrl: './data-format-data-facet.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './data-format-data-facet.component.css']
})
export class DataFormatDataFacetComponentV2 extends DataFacetComponent {
  @Input() dataFormats!: DataFormat[];

  addDataFormat() {
    this.dataFormats.push(DataFormat.default());
  };

  removeDataFormat(uuid: string) {
    var index = 0;
    for(index = 0; index < this.dataFormats.length; index++) {
      if(uuid === this.dataFormats[index].uuid) {
        break;
      }
    };

    this.dataFormats.splice(index, 1);
  };
}
