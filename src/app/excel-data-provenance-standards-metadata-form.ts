import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { iso31661, iso31662, ISO31662Entry } from 'iso-3166';
import { ConfidentialityClassification, IntendedDataUse, Method, PrivacyEnhancingTechnology } from '@data-and-trust-alliance/metadata-reference';

import { DataFacetDescriptions } from './data-facet-descriptions';
import { DataFacetPlaceholders } from './data-facet-placeholders';

export class ExcelDataProvenanceStandardsMetadataForm {
  static readonly geolocationWorksheetName = "Geolocation";
  static readonly methodWorksheetName = "Method";
  static readonly privacyEnhancingTechnologyWorksheetName = "Privacy enhancing technology";
  static readonly intendedDataUseWorksheetName = "Intended data use";
  static readonly confidentialityClassificationWorksheetName = "Confidentiality classification";

  static async generateWorkbook() {
    const workbook = new ExcelJS.Workbook();

    this.generateDataProvenanceStandardsWorksheet(workbook);
    this.generateGeolocationReferenceWorksheet(workbook);
    this.generateMethodReferenceWorksheet(workbook);
    this.generatePrivacyEnhancingTechnologyReferenceWorksheet(workbook);
    this.generateIntendedDataUseReferenceWorksheet(workbook);
    this.generateConfidentialityClassificationReferenceWorksheet(workbook);

    const buf = await workbook.xlsx.writeBuffer();

    saveAs(new Blob([buf]), "data-provenance-standards-1.0.0.xlsx");
  };

  static adjustColumnWidth(worksheet: ExcelJS.Worksheet) {
    worksheet.columns.forEach(column => {
      if(column && column.values) {
        const lengths = column.values.map(v => v ? v.toString().length : 0);
        const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
        column.width = maxLength + 2;
      }
    });
  };

  static generateDataProvenanceStandardsWorksheet(workbook: ExcelJS.Workbook) {
    const worksheet = workbook.addWorksheet("Metadata standard");

    const topLevelCategories = [
      {
        value: "Source",
        startColumn: 1,
        endColumn: 7
      }, {
        value: "Provenance",
        startColumn: 8,
        endColumn: 20
      }, {
        value: "Use",
        startColumn: 21,
        endColumn: 44
      }
    ];

    // Merge top-level columns together.
    topLevelCategories.forEach(
      (category) => {
        worksheet.mergeCells(1, category.startColumn, 1, category.endColumn);
        worksheet.getCell(this.numberToLetters(category.startColumn) + "1").value = category.value;

        // Center text.
        worksheet.getCell(this.numberToLetters(category.startColumn) + "1").alignment = {
          horizontal: 'center',
          vertical : 'top'
        };
      }
    );

    const columnHeaders = ["Standards version", "Dataset title/name", "Unique metadata identifier", "Metadata location", "Data issuer name", "Data issuer address", "Description of the dataset", "Source metadata for dataset", "Source name", "Source address", "Data origin geography country", "Data origin geography state", "Dataset issue date", "Date of previously issued version of the dataset", "Range of dates for data generation start", "Range of dates for data generation end", "Method code", "Method system", "Method description", "Data format", "Confidentiality classification code", "Confidentiality classification system", "Confidentiality classification description", "Consent documentation location", "Privacy enhancing technologies tool code", "Privacy enhancing technologies tool system", "Privacy enhancing technologies tool description", "Privacy enhancing technologies parameters", "Privacy enhancing technologies result", "Data processing geography country include", "Data processing geography state include", "Data processing geography country exclude", "Data processing geography state exclude", "Data storage geography country include", "Data storage geography state include", "Data storage geography country exclude", "Data storage geography state exclude", "License to use", "Intended data use code", "Intended data use system", "Intended data use description", "Proprietary data presence copyright", "Proprietary data presence patent", "Proprietary data presence trademark"];

    const columnHeaderRow = worksheet.addRow(columnHeaders);
    columnHeaderRow.font = { bold: true };
    columnHeaderRow.eachCell(
      // Center text.
      cell => {
        cell.alignment = {
          horizontal: 'center',
          vertical : 'top'
        };
      }
    );

    // Adjust column widths before applying descriptions.
    this.adjustColumnWidth(worksheet);

    // Add descriptions.
    const descriptions = [
      {
        value: DataFacetDescriptions.datasetTitle,
        startColumn: 2,
        endColumn: 2
      }, {
        value: DataFacetDescriptions.metadataId,
        startColumn: 3,
        endColumn: 3
      }, {
        value: DataFacetDescriptions.metadataLocation,
        startColumn: 4,
        endColumn: 4
      }, {
        value: DataFacetDescriptions.dataIssuer,
        startColumn: 5,
        endColumn: 6
      }, {
        value: DataFacetDescriptions.datasetDescription,
        startColumn: 7,
        endColumn: 7
      }, {
        value: DataFacetDescriptions.sourceMetadata,
        startColumn: 8,
        endColumn: 8
      }, {
        value: DataFacetDescriptions.source,
        startColumn: 9,
        endColumn: 10
      }, {
        value: DataFacetDescriptions.dataOriginLocation,
        startColumn: 11,
        endColumn: 12
      }, {
        value: DataFacetDescriptions.datasetIssueDate,
        startColumn: 13,
        endColumn: 13
      }, {
        value: DataFacetDescriptions.previousVersionDate,
        startColumn: 14,
        endColumn: 14
      }, {
        value: DataFacetDescriptions.dataGenerationDateRange,
        startColumn: 15,
        endColumn: 16
      }, {
        value: DataFacetDescriptions.method,
        startColumn: 17,
        endColumn: 19
      }, {
        value: DataFacetDescriptions.dataFormat,
        startColumn: 20,
        endColumn: 20
      }, {
        value: DataFacetDescriptions.confidentialityClassification,
        startColumn: 21,
        endColumn: 23
      }, {
        value: DataFacetDescriptions.consentDocumentationLocation,
        startColumn: 24,
        endColumn: 24
      }, {
        value: DataFacetDescriptions.privacyEnhancingTechnology,
        startColumn: 25,
        endColumn: 29
      }, {
        value: DataFacetDescriptions.dataProcessingLocation,
        startColumn: 30,
        endColumn: 33
      }, {
        value: DataFacetDescriptions.dataStorageLocation,
        startColumn: 34,
        endColumn: 37
      }, {
        value: DataFacetDescriptions.license,
        startColumn: 38,
        endColumn: 38
      }, {
        value: DataFacetDescriptions.intendedDataUse,
        startColumn: 39,
        endColumn: 41
      }, {
        value: DataFacetDescriptions.proprietaryDataPresence,
        startColumn: 42,
        endColumn: 44
      }
    ];

    // Merge description columns together and assign values.
    descriptions.forEach(
      (description) => {
        worksheet.mergeCells(3, description.startColumn, 3, description.endColumn);
        worksheet.getCell(this.numberToLetters(description.startColumn) + "3").value = description.value;

        // Allow descriptions to wrap text.
        worksheet.getCell(this.numberToLetters(description.startColumn) + "3").alignment = {
          horizontal: 'left',
          vertical : 'top',
          wrapText: true
        };

        // Apply minimum column width if needed.  Tends to only apply to single column entries.
        //TODO Find a better way to do this.
        const minimumColumnWidth = 40;
        if(description.startColumn === description.endColumn) {
          const currentColumnWidth = worksheet.getColumn(description.startColumn).width!;
          if(currentColumnWidth < minimumColumnWidth) {
            worksheet.getColumn(description.startColumn).width = minimumColumnWidth;
          }
        }
      }
    );

    // Set the description row height.
    //TODO Find a better way to do this.
    worksheet.getRow(3).height = 210;

    // Add dropdown options for country and subregion for geolocation selectors.
    // Countries handled with delimited list to prevent duplication.
    const countryOptions = iso31661.map(
      (countryOption) => '"' + countryOption.alpha2 + '"'
    ).sort();

    // Subregions handled with Excel reference formula.
    const subregionFormula = "'" + this.geolocationWorksheetName + "'!$D$2:$D$3767";

    // Methods Excel reference formulas.
    const methodCodeFormula = "'" + this.methodWorksheetName + "'!$B$2:$B$66";
    const methodSystemFormula = "'" + this.methodWorksheetName + "'!$C$2:$C$66";
    const methodDescriptionFormula = "'" + this.methodWorksheetName + "'!$A$2:$A$66";

    // Privacy enhancing technology Excel reference formulas.
    const privacyEnhancingTechnologyCodeFormula = "'" + this.privacyEnhancingTechnologyWorksheetName + "'!$B$2:$B$15";
    const privacyEnhancingTechnologySystemFormula = "'" + this.privacyEnhancingTechnologyWorksheetName + "'!$C$2:$C$15";
    const privacyEnhancingTechnologyDescriptionFormula = "'" + this.privacyEnhancingTechnologyWorksheetName + "'!$A$2:$A$15";

    // Intended data use Excel reference formulas.
    const intendedDataUseCodeFormula = "'" + this.intendedDataUseWorksheetName + "'!$B$2:$B$10";
    const intendedDataUseSystemFormula = "'" + this.intendedDataUseWorksheetName + "'!$C$2:$C$10";
    const intendedDataUseDescriptionFormula = "'" + this.intendedDataUseWorksheetName + "'!$A$2:$A$10";

    // Confidentiality classification Excel reference formulas.
    const confidentialityClassificationCodeFormula = "'" + this.confidentialityClassificationWorksheetName + "'!$B$2:$B$7";
    const confidentialityClassificationSystemFormula = "'" + this.confidentialityClassificationWorksheetName + "'!$C$2:$C$7";
    const confidentialityClassificationDescriptionFormula = "'" + this.confidentialityClassificationWorksheetName + "'!$A$2:$A$7";

    for(var rowIndex = 0; rowIndex < 100; rowIndex++) {
      // Data origin location validation.
      worksheet.getCell(this.numberToLetters(11) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [countryOptions.toString()]
      };

      worksheet.getCell(this.numberToLetters(12) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [subregionFormula]
      };

      // Method validation.
      worksheet.getCell(this.numberToLetters(17) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [methodCodeFormula]
      };

      worksheet.getCell(this.numberToLetters(18) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [methodSystemFormula]
      };

      worksheet.getCell(this.numberToLetters(19) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [methodDescriptionFormula]
      };

      // Confidentiality classification validation.
      worksheet.getCell(this.numberToLetters(21) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [confidentialityClassificationCodeFormula]
      };

      worksheet.getCell(this.numberToLetters(22) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [confidentialityClassificationSystemFormula]
      };

      worksheet.getCell(this.numberToLetters(23) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [confidentialityClassificationDescriptionFormula]
      };

      // Privacy enhancing technology validation.
      worksheet.getCell(this.numberToLetters(25) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [privacyEnhancingTechnologyCodeFormula]
      };

      worksheet.getCell(this.numberToLetters(26) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [privacyEnhancingTechnologySystemFormula]
      };

      worksheet.getCell(this.numberToLetters(27) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [privacyEnhancingTechnologyDescriptionFormula]
      };

      // Data processing location validation.
      worksheet.getCell(this.numberToLetters(30) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [countryOptions.toString()]
      };

      worksheet.getCell(this.numberToLetters(31) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [subregionFormula]
      };

      worksheet.getCell(this.numberToLetters(32) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [countryOptions.toString()]
      };

      worksheet.getCell(this.numberToLetters(33) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [subregionFormula]
      };

      // Data storage location validation.
      worksheet.getCell(this.numberToLetters(34) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [countryOptions.toString()]
      };

      worksheet.getCell(this.numberToLetters(35) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [subregionFormula]
      };

      // Data storage location validation.
      worksheet.getCell(this.numberToLetters(36) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [countryOptions.toString()]
      };

      worksheet.getCell(this.numberToLetters(37) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [subregionFormula]
      };

      // Intended data use validation.
      worksheet.getCell(this.numberToLetters(39) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [intendedDataUseCodeFormula]
      };

      worksheet.getCell(this.numberToLetters(40) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [intendedDataUseSystemFormula]
      };

      worksheet.getCell(this.numberToLetters(41) + (4 + rowIndex).toString()).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [intendedDataUseDescriptionFormula]
      };
    }
  };

  static generateGeolocationReferenceWorksheet(workbook: ExcelJS.Workbook) {
    const worksheet = workbook.addWorksheet(this.geolocationWorksheetName);

    const headers = ["Country Display Name", "Country Code", "Subregion Display Name", "Subregion Code"];

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };

    const countryOptions = iso31661;
    const stateOptions = iso31662;

    countryOptions.forEach(
      (countryOption) => {
        const countryDisplayName = countryOption.name;
        const countryCode = countryOption.alpha2;

        const states = stateOptions.filter(
          (stateOption) => stateOption.parent === countryCode
        );

        states.forEach(
          (state) => {
            const stateDisplayName = state.name;
            const stateCode = state.code;
            worksheet.addRow([countryDisplayName, countryCode, stateDisplayName, stateCode]);
          }
        );
      }
    );

    this.adjustColumnWidth(worksheet);
  };

  static generateMethodReferenceWorksheet(workbook: ExcelJS.Workbook) {
    const worksheet = workbook.addWorksheet(this.methodWorksheetName);

    const headers = ["Method description", "Method code", "Method system"];

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };

    Method.defaultOptions.forEach(
      (defaultOption) => {
        const description = Method.getDefaultDescription(defaultOption.categoryText, defaultOption.specificUseText);
        const code = defaultOption.code;
        const system = Method.defaultSystem;
        worksheet.addRow([description, code, system]);
      }
    );

    this.adjustColumnWidth(worksheet);
  };

  static generatePrivacyEnhancingTechnologyReferenceWorksheet(workbook: ExcelJS.Workbook) {
    const worksheet = workbook.addWorksheet(this.privacyEnhancingTechnologyWorksheetName);

    const headers = ["Privacy enhancing technology tool description", "Privacy enhancing technology tool code", "Privacy enhancing technology tool system"];

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };

    PrivacyEnhancingTechnology.defaultOptions.forEach(
      (defaultOption) => {
        const description = defaultOption.description;
        const code = defaultOption.code;
        const system = PrivacyEnhancingTechnology.defaultSystem;
        worksheet.addRow([description, code, system]);
      }
    );

    this.adjustColumnWidth(worksheet);
  };

  static generateIntendedDataUseReferenceWorksheet(workbook: ExcelJS.Workbook) {
    const worksheet = workbook.addWorksheet(this.intendedDataUseWorksheetName);

    const headers = ["Intended data use description", "Intended data use code", "Intended data use system"];

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };

    // Add Non-AI options.
    IntendedDataUse.defaultNonAiOptions.forEach(
      (defaultOption) => {
        const description = defaultOption.description;
        const code = defaultOption.code;
        const system = IntendedDataUse.defaultSystem;
        worksheet.addRow([description, code, system]);
      }
    );

    // Add custom non-AI option.
    worksheet.addRow(["Non-AI Other", "non-ai-other", IntendedDataUse.defaultSystem]);

    // Add AI options.
    IntendedDataUse.defaultAiOptions.forEach(
      (defaultOption) => {
        const description = defaultOption.description;
        const code = defaultOption.code;
        const system = IntendedDataUse.defaultSystem;
        worksheet.addRow([description, code, system]);
      }
    );

    // Add custom AI option.
    worksheet.addRow(["AI Other", "ai-other", IntendedDataUse.defaultSystem]);

    this.adjustColumnWidth(worksheet);
  };

  static generateConfidentialityClassificationReferenceWorksheet(workbook: ExcelJS.Workbook) {
    const worksheet = workbook.addWorksheet(this.confidentialityClassificationWorksheetName);

    const headers = ["Confidentiality classification description", "Confidentiality classification code", "Confidentiality classification system"];

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };

    ConfidentialityClassification.defaultOptions.forEach(
      (defaultOption) => {
        const description = defaultOption.description;
        const code = defaultOption.code;
        const system = ConfidentialityClassification.defaultSystem;
        worksheet.addRow([description, code, system]);
      }
    );

    this.adjustColumnWidth(worksheet);
  };

  static numberToLetters(num: number) {
    // Need to decrement Excel column index by 1.
    //TODO Find a better way to implement this conversion that doesn't require this awkward step.
    num -= 1;

    let letters = '';
    while (num >= 0) {
      letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters;
      num = Math.floor(num / 26) - 1;
    }
    return letters;
  };
}
