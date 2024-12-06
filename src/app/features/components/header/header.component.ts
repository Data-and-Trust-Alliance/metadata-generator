import { Component } from '@angular/core';

import { ExcelDataProvenanceStandardsMetadataForm } from '../../../excel-data-provenance-standards-metadata-form';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  headerMainText: string = "In today\'s data-driven world, maintaining transparent and trusted data is not just beneficial — it\'s essential.  This page lets you capture Data Provenance Standards information for your data set and generate metadata files in JSON, YAML, CSV, or XML formats.";

  generateExcelForm() {
    //TODO Uncomment when Excel format is completed.
//    ExcelDataProvenanceStandardsMetadataForm.generateWorkbook();
  };
}
