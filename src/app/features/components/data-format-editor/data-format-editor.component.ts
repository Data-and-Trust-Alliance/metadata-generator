import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataFormat } from '@data-and-trust-alliance/metadata-reference';

@Component({
  selector: 'app-data-format-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-format-editor.component.html',
  styleUrls: ['../../../data-facet/data-facet.component.css', './data-format-editor.component.css']
})
export class DataFormatEditorComponent {
  @Input() dataFormat!: DataFormat;
  @Output() dataFormatChange = new EventEmitter<DataFormat>();
  @Output() remove = new EventEmitter<string>();

  dataFormatOptions = DataFormat.defaultOptions.concat("Other");
  dataFormatOptionSelected = "";

  optionUpdated() {
    if(this.dataFormatOptionSelected === 'Other') {
      this.dataFormat.value = "";
    } else {
      this.dataFormat.value = this.dataFormatOptionSelected;
    }

    this.dataFormatChange.emit(this.dataFormat);
  };
}
