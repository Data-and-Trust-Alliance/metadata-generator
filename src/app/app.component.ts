import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Parser } from '@json2csv/plainjs';
import { flatten } from '@json2csv/transforms';
import { v4 as uuid } from 'uuid';
import * as xmljs from 'xml-js';
import YAML from 'yaml';
import { ConfidentialityClassification, DataFormat, IntendedDataUse, Location, Method, Organization, PrivacyEnhancingTechnology } from '@data-and-trust-alliance/metadata-reference';

import { CheckboxDetailsEntry } from './checkbox-list-with-details/checkbox-details-entry';
import { CheckboxListWithDetailsComponent } from './checkbox-list-with-details/checkbox-list-with-details.component';
import { CheckboxOptionWithDetails } from './checkbox-list-with-details/checkbox-option-with-details';
import { ConfidentialityClassificationDataFacetComponent } from './confidentiality-classification-data-facet/confidentiality-classification-data-facet.component';
import { ConfidentialityClassificationTool } from './confidentiality-classification-data-facet/confidentiality-classification-tool';
import { ConsentDocumentationLocation } from './consent-documentation-location-data-facet/consent-documentation-location';
import { ConsentDocumentationLocationDataFacetComponent } from './consent-documentation-location-data-facet/consent-documentation-location-data-facet.component';
import { CosmosDbProxyApiService } from './features/services/cosmos-db-proxy-api.service';
import { DataFacetComponent } from './data-facet/data-facet.component';
import { DataFacetDescriptions } from './data-facet-descriptions';
import { DataFacetPlaceholders } from './data-facet-placeholders';
import { DataFormatDataFacetComponentV2 } from './features/components/data-format-data-facet/data-format-data-facet.component';
import { DataGenerationDateRangeDataFacetComponent } from './features/components/data-generation-date-range-data-facet/data-generation-date-range-data-facet.component';
import { DataIssuerDataFacetComponentV2 } from './features/components/data-issuer-data-facet/data-issuer-data-facet.component';
import { HeaderComponent } from './features/components/header/header.component';
import { GeographySelectorDataFacetComponent } from './features/components/geography-selector-data-facet/geography-selector-data-facet.component';
import { IntendedDataUseDataFacetComponent } from './intended-data-use-data-facet/intended-data-use-data-facet.component';
import { MethodDataFacetComponent } from './method-data-facet/method-data-facet.component';
import { PreviousVersionDateDataFacetComponent } from './features/components/previous-version-date-data-facet/previous-version-date-data-facet.component';
import { PrivacyEnhancingTechnologyDataFacetComponent } from './privacy-enhancing-technology-data-facet/privacy-enhancing-technology-data-facet.component';
import { SimpleDateDataFacetComponent } from './features/components/simple-date-data-facet/simple-date-data-facet.component';
import { SimpleTextDataFacetComponent } from './features/components/simple-text-data-facet/simple-text-data-facet.component';
import { SourceDataFacetComponentV2 } from './features/components/source-data-facet/source-data-facet.component';
import { SourceMetadata } from './source-metadata-data-facet/source-metadata';
import { SourceMetadataDataFacetComponent } from './source-metadata-data-facet/source-metadata-data-facet.component';
import { StandardsVersionDataFacetComponent } from './standards-version-data-facet/standards-version-data-facet.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CheckboxListWithDetailsComponent, ConfidentialityClassificationDataFacetComponent, ConsentDocumentationLocationDataFacetComponent, DataFacetComponent, DataFormatDataFacetComponentV2, DataGenerationDateRangeDataFacetComponent, DataIssuerDataFacetComponentV2, FormsModule, GeographySelectorDataFacetComponent, HeaderComponent, IntendedDataUseDataFacetComponent, MethodDataFacetComponent, PreviousVersionDateDataFacetComponent, PrivacyEnhancingTechnologyDataFacetComponent, RouterOutlet, SimpleDateDataFacetComponent, SimpleTextDataFacetComponent, SourceDataFacetComponentV2, SourceMetadataDataFacetComponent, StandardsVersionDataFacetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cosmosDsProxyApiService: CosmosDbProxyApiService = inject(CosmosDbProxyApiService);

  title = 'data-and-trust-alliance-standards';

  datasetTitle: string = "";
  datasetTitleValid: boolean = false;
  getDatasetTitleDescription() {
    return DataFacetDescriptions.datasetTitle;
  };
  getDatasetTitlePlaceholder() {
    return DataFacetPlaceholders.datasetTitle;
  };

  metadataId: string = "";
  metadataIdValid: boolean = false;
  getMetadataIdDescription() {
    return DataFacetDescriptions.metadataId;
  };
  getMetadataIdPlaceholder() {
    return DataFacetPlaceholders.metadataId;
  };

  metadataLocation: string = "";
  metadataLocationValid: boolean = false;
  getMetadataLocationDescription() {
    return DataFacetDescriptions.metadataLocation;
  };
  getMetadataLocationPlaceholder() {
    return DataFacetPlaceholders.metadataLocation;
  };

  dataIssuersV2: Organization[] = [];
  dataIssuersV2Valid: boolean = false;
  getDataIssuerDescription() {
    return DataFacetDescriptions.dataIssuer;
  };

  datasetDescription: string = "";
  datasetDescriptionValid: boolean = false;
  getDatasetDescriptionDescription() {
    return DataFacetDescriptions.datasetDescription;
  };
  getDatasetDescriptionPlaceholder() {
    return DataFacetPlaceholders.datasetDescription;
  };

  sourceMetadatas: SourceMetadata[] = [];
  sourceMetadatasValid: boolean = false;
  getSourceMetadataDescription() {
    return DataFacetDescriptions.sourceMetadata;
  };

  useDataIssuerAsSource: boolean = false;
  sourcesV2: Organization[] = [];
  sourcesValidV2:boolean = false;
  getSourceDescription() {
    return DataFacetDescriptions.source;
  };

  dataOriginLocations: Location[] = [];
  dataOriginLocationsValid:boolean = false;
  getDataOriginLocationDescription() {
    return DataFacetDescriptions.dataOriginLocation;
  };

  datasetIssueDate: string = "";
  datasetIssueDateValid: boolean = false;
  getDatasetIssueDateDescription() {
    return DataFacetDescriptions.datasetIssueDate;
  };
  getDatasetIssueDatePlaceholder() {
    return DataFacetPlaceholders.datasetIssueDate;
  };

  previousVersionDate: string = "";
  previousVersionDateValid: boolean = false;
  getPreviousVersionDateDescription() {
    return DataFacetDescriptions.previousVersionDate;
  };
  getPreviousVersionDatePlaceholder() {
    return DataFacetPlaceholders.previousVersionDate;
  };

  dataGenerationStartDate: string = "";
  dataGenerationEndDate: string = "";
  dataGenerationDatesValid: boolean = false;
  getDataGenerationDateRangeDescription() {
    return DataFacetDescriptions.dataGenerationDateRange;
  };
  getDataGenerationDateRangePlaceholder() {
    return DataFacetPlaceholders.dataGenerationDateRange;
  };

  methods: Method[] = [];
  methodsValid: boolean = false;
  getMethodDescription() {
    return DataFacetDescriptions.method;
  };

  dataFormats: DataFormat[] = [];
  dataFormatsValid: boolean = false;
  getDataFormatDescription() {
    return DataFacetDescriptions.dataFormat;
  };

  defaultConfidentialityClassifications: ConfidentialityClassification[] = ConfidentialityClassification.defaultOptions.map(
    (option) => {
      return ConfidentialityClassification.dataProvenanceStandardsEntry(option.code, option.description);
    }
  );
  customConfidentialityClassifications: ConfidentialityClassification[] = [];
  confidentialityClassificationsValid: boolean = false;
  getConfidentialityClassificationDescription() {
    return DataFacetDescriptions.confidentialityClassification;
  };
  getConfidentialityClassificationPlaceholder() {
    return DataFacetPlaceholders.confidentialityClassification;
  };
  confidentialityClassificationTools: ConfidentialityClassificationTool[] = [];

  consentDocumentationLocations: ConsentDocumentationLocation[] = [];
  consentDocumentationLocationsValid: boolean = false;
  getConsentDocumentationLocationDescription() {
    return DataFacetDescriptions.consentDocumentationLocation;
  };

  privacyEnhancingTechnologies: PrivacyEnhancingTechnology[] = [];
  privacyEnhancingTechnologiesValid: boolean = false;
  getPrivacyEnhancingTechnologyDescription() {
    return DataFacetDescriptions.privacyEnhancingTechnology;
  };

  useDataOriginAsDataProcessingGeography: boolean = false;
  dataProcessingLocations: Location[] = [];
  dataProcessingReplicationStatusUpdate(value: boolean) {
    this.useDataOriginAsDataProcessingGeography = value;
    if(value) {
      this.dataProcessingLocations = this.dataOriginLocations;
    } else {
      this.dataProcessingLocations = [];
    }

    // Check if data storage geography needs updating.
    if(this.useDataProcessingGeographyAsDataStorageGeography) {
      this.dataStorageReplicationStatusUpdate(this.useDataProcessingGeographyAsDataStorageGeography);
    }
  };
  dataProcessingLocationsValid: boolean = false;
  getDataProcessingLocationDescription() {
    return DataFacetDescriptions.dataProcessingLocation;
  };

  useDataProcessingGeographyAsDataStorageGeography: boolean = false;
  dataStorageLocations: Location[] = [];
  dataStorageReplicationStatusUpdate(value: boolean) {
    this.useDataProcessingGeographyAsDataStorageGeography = value;
    if(value) {
      this.dataStorageLocations = this.dataProcessingLocations;
    } else {
      this.dataStorageLocations = [];
    }
  };
  dataStorageLocationsValid: boolean = false;
  getDataStorageLocationDescription() {
    return DataFacetDescriptions.dataStorageLocation;
  };

  licenseToUseList: CheckboxOptionWithDetails[] = [
    CheckboxOptionWithDetails.labelOnly("None"),
    CheckboxOptionWithDetails.labelWithDetails("Non-commercial", "Location or point of contact", "Enter URL or license point of contact here", "Add License"),
    CheckboxOptionWithDetails.labelWithDetails("Public license", "Location or point of contact", "Enter URL or license point of contact here", "Add License"),
    CheckboxOptionWithDetails.labelWithDetails("Commercial/Negotiated License", "Location or point of contact", "Enter URL or license point of contact here", "Add License")
  ];
  licenseToUseValid: boolean = false;
  getLicenseDescription() {
    return DataFacetDescriptions.license;
  };

  defaultNonAiIntendedDataUses: IntendedDataUse[] = IntendedDataUse.defaultNonAiOptions.map(
    (option) => {
      return IntendedDataUse.dataProvenanceStandardsEntry(option.code, option.description, option.descriptionText);
    }
  );
  customNonAiIntendedDataUses: IntendedDataUse[] = [];

  defaultAiIntendedDataUses: IntendedDataUse[] = IntendedDataUse.defaultAiOptions.map(
    (option) => {
      return IntendedDataUse.dataProvenanceStandardsEntry(option.code, option.description, option.descriptionText);
    }
  );
  customAiIntendedDataUses: IntendedDataUse[] = [];

  intendedDataUseValid: boolean = false;
  getIntendedDataUseDescription() {
    return DataFacetDescriptions.intendedDataUse;
  };

  proprietaryDataPresenceList: CheckboxOptionWithDetails[] = [
    CheckboxOptionWithDetails.labelOnly("None"),
    CheckboxOptionWithDetails.labelWithDetails("Copyright", "Identifier", "Enter copyright identifier here", "Add Identifier"),
    CheckboxOptionWithDetails.labelWithDetails("Patent", "Identifier", "Enter patent identifier here", "Add Identifier"),
    CheckboxOptionWithDetails.labelWithDetails("Trademark", "Identifier", "Enter trademark registration/application identifier here", "Add Identifier")
  ];
  proprietaryDataPresenceValid: boolean = false;
  getProprietaryDataPresenceDescription() {
    return DataFacetDescriptions.proprietaryDataPresence;
  };

  generateDataStandardEntity() {
    // Generate source.
    var source = new Map();

    source.set("version", "1.0.0");

    source.set("title", this.datasetTitle);

    source.set("id", this.metadataId);

    source.set("location", this.metadataLocation);

    source.set("issuer", this.convertDataIssuers());

    source.set("description", this.datasetDescription);

    // Generate provenance.
    var provenance = new Map();

    provenance.set("source", this.convertSourceMetadatas());

    if(this.useDataIssuerAsSource || this.sourcesV2.length !== 0) {
      provenance.set("origin", this.convertSources());
    }

    provenance.set("origin-geography", this.convertDataOriginLocations());

    provenance.set("date", this.datasetIssueDate);

    if(this.previousVersionDate !== "") {
      provenance.set("previous-date", this.previousVersionDate);
    }

    if(this.dataGenerationStartDate !== "" || this.dataGenerationEndDate !== "") {
      provenance.set("generation-period", this.convertDataGenerationDateRange());
    }

    provenance.set("generation-method", this.convertMethods());

    if(this.dataFormats.length !== 0) {
      provenance.set("format", this.convertDataFormats());
    }

    // Generate use.
    var use = new Map();

    use.set("classification", this.convertConfidentialityClassifications());

    use.set("consents", this.convertConsentDocumentationLocations());

    use.set("privacy-indicators", this.convertPrivacyEnhancingTechnologies());

    use.set("processing-included", this.convertDataProcessingLocations(true));

    use.set("processing-excluded", this.convertDataProcessingLocations(false));

    use.set("storage-allowed", this.convertDataStorageLocations(true));

    use.set("storage-prohibited", this.convertDataStorageLocations(false));

    use.set("license", this.convertLicenseToUseList());

    use.set("intended-purpose", this.convertIntendedDataUses());

    use.set("copyright", this.convertProprietaryDataPresenceList("Copyright"));

    use.set("patent", this.convertProprietaryDataPresenceList("Patent"));

    use.set("trademark", this.convertProprietaryDataPresenceList("Trademark"));

    // Aggregate the data.
    var dataStandardEntity = new Map();
    dataStandardEntity.set("source", Object.fromEntries(source));
    dataStandardEntity.set("provenance", Object.fromEntries(provenance));
    dataStandardEntity.set("use", Object.fromEntries(use));

    console.log(dataStandardEntity);

    const jsonObject = Object.fromEntries(dataStandardEntity);

    console.log(jsonObject);

    return jsonObject;
  };

  convertDataIssuers() {
    return this.dataIssuersV2.map(
      (dataIssuer) => {
        const address = dataIssuer.addressLines.map(
          (addressLine) => {
            return addressLine.address;
          }
        );

        return {
          "name": dataIssuer.name,
          "address": address
        };
      }
    );
  };

  convertSourceMetadatas() {
    return this.sourceMetadatas.map(
      (sourceMetadata) => sourceMetadata.value
    );
  };

  convertSources() {
    if(this.useDataIssuerAsSource) {
      return this.convertDataIssuers();
    } else {
      return this.sourcesV2.map(
        (source) => {
          const address = source.addressLines.map(
            (addressLine) => {
              return addressLine.address;
            }
          );

          return {
            "name": source.name,
            "address": address
          };
        }
      );
    }
  };

  convertDataOriginLocations() {
    return this.dataOriginLocations.map(
      (dataOriginLocation) => {
        if(dataOriginLocation.state !== "") {
          return {
            "country": dataOriginLocation.country,
            "state": dataOriginLocation.state
          };
        } else {
          return {
            "country": dataOriginLocation.country
          };
        }
      }
    );
  };

  convertDataGenerationDateRange() {
    if(this.dataGenerationStartDate === "") {
      return {
        "end": this.dataGenerationEndDate
      };
    } else if(this.dataGenerationEndDate === "") {
      return {
        "start": this.dataGenerationStartDate
      };
    } else {
      return {
        "start": this.dataGenerationStartDate,
        "end": this.dataGenerationEndDate
      };
    }
  };

  convertMethods() {
    return this.methods.map(
      (method) => {
        return {
          "code": method.code,
          "system": method.system,
          "description": method.description
        };
      }
    );
  };

  convertDataFormats() {
    return this.dataFormats.map(
      (dataFormat) => dataFormat.value
    );
  };

  convertConfidentialityClassificationTools() {
    return this.confidentialityClassificationTools.map(
      (tool) => tool.value
    ).join(";");
  };

  convertConfidentialityClassifications() {
    // Identify any default entries that are enabled.
    var defaultEntries = this.defaultConfidentialityClassifications.filter(
      (confidentialityClassification) => confidentialityClassification.enabled
    ).map(
      (confidentialityClassification) => {
        return {
          "regulation": {
            "code": confidentialityClassification.code,
            "system": confidentialityClassification.system,
            "description": confidentialityClassification.description
          },
          "evaluated": "true",
          "tool": this.convertConfidentialityClassificationTools()
        };
      }
    );

    // Convert the custom entries.
    var customEntries = this.customConfidentialityClassifications.map(
      (confidentialityClassification) => {
        return {
          "regulation": {
            "code": confidentialityClassification.code,
            "system": confidentialityClassification.system,
            "description": confidentialityClassification.description
          },
          "evaluated": "true",
          "tool": this.convertConfidentialityClassificationTools()
        };
      }
    );

    // Combine the lists.
    return defaultEntries.concat(customEntries);
  };

  convertConsentDocumentationLocations() {
    return this.consentDocumentationLocations.map(
      (consentDocumentationLocation) => consentDocumentationLocation.value
    );
  };

  convertPrivacyEnhancingTechnologies() {
    return this.privacyEnhancingTechnologies.map(
      (privacyEnhancingTechnology) => {
        const parameters = privacyEnhancingTechnology.parameters.map(
          (parameter) => {
            return (parameter.key + "=" + parameter.value);
          }
        );

        return {
          "toolCategory": {
            "code": privacyEnhancingTechnology.toolCategory.code,
            "system": privacyEnhancingTechnology.toolCategory.system,
            "description": privacyEnhancingTechnology.toolCategory.description
          },
          "toolUsed": privacyEnhancingTechnology.toolUsed,
          "parameters": parameters,
          "result": privacyEnhancingTechnology.result
        };
      }
    );
  };

  convertDataProcessingLocations(inclusion: boolean) {
    return this.dataProcessingLocations.filter(
      (dataProcessingLocation) => dataProcessingLocation.inclusion === inclusion
    ).map(
      (dataProcessingLocation) => {
        if(dataProcessingLocation.state !== "") {
          return {
            "country": dataProcessingLocation.country,
            "state": dataProcessingLocation.state
          };
        } else {
          return {
            "country": dataProcessingLocation.country
          };
        }
      }
    );
  };

  convertDataStorageLocations(inclusion: boolean) {
    return this.dataStorageLocations.filter(
      (dataStorageLocation) => dataStorageLocation.inclusion === inclusion
    ).map(
      (dataStorageLocation) => {
        if(dataStorageLocation.state !== "") {
          return {
            "country": dataStorageLocation.country,
            "state": dataStorageLocation.state
          };
        } else {
          return {
            "country": dataStorageLocation.country
          };
        }
      }
    );
  };

  convertLicenseToUseList() {
    return this.licenseToUseList.map(
      (licenseToUse) => licenseToUse.detailsEntries
    ).flatMap(
      (details) => {
        return details.map(
          (entry) => entry.value
        );
      }
    );
  };

  convertIntendedDataUses() {
    // Identify any default non-AI entries that are enabled.
    var defaultNonAiEntries = this.defaultNonAiIntendedDataUses.filter(
      (entry) => entry.enabled
    ).map(
      (entry) => {
        return {
          "code": entry.code,
          "system": entry.system,
          "description": entry.description
        };
      }
    );

    // Convert the custom non-AI entries.
    var customNonAiEntries = this.customNonAiIntendedDataUses.map(
      (entry) => {
        return {
          "code": entry.code,
          "system": entry.system,
          "description": entry.description
        };
      }
    );

    // Identify any default AI entries that are enabled.
    var defaultAiEntries = this.defaultAiIntendedDataUses.filter(
      (entry) => entry.enabled
    ).map(
      (entry) => {
        return {
          "code": entry.code,
          "system": entry.system,
          "description": entry.description
        };
      }
    );

    // Convert the custom AI entries.
    var customAiEntries = this.customAiIntendedDataUses.map(
      (entry) => {
        return {
          "code": entry.code,
          "system": entry.system,
          "description": entry.description
        };
      }
    );

    // Combine the lists.
    return defaultNonAiEntries.concat(customNonAiEntries).concat(defaultAiEntries).concat(customAiEntries);
  };

  convertProprietaryDataPresenceList(category: string) {
    return this.proprietaryDataPresenceList.filter(
      (proprietaryDataPresenceCategory) => proprietaryDataPresenceCategory.label === category
    ).map(
      (proprietaryDataPresenceCategory) => proprietaryDataPresenceCategory.detailsEntries
    ).flatMap(
      (details) => {
        return details.map(
          (entry) => entry.value
        );
      }
    );
  };

  @ViewChildren(SimpleTextDataFacetComponent) simpleTextDataFacetComponents!: QueryList<SimpleTextDataFacetComponent>;

  @ViewChild(DataIssuerDataFacetComponentV2) dataIssuerDataFacetComponentV2!: DataIssuerDataFacetComponentV2;

  @ViewChild(SourceMetadataDataFacetComponent) sourceMetadataDataFacetComponent!: SourceMetadataDataFacetComponent;

  @ViewChild(SourceDataFacetComponentV2) sourceDataFacetComponentV2!: SourceDataFacetComponentV2;

  @ViewChildren(GeographySelectorDataFacetComponent) geographySelectorDataFacetComponents!: QueryList<GeographySelectorDataFacetComponent>;

  @ViewChildren(SimpleDateDataFacetComponent) simpleDateDataFacetComponents!: QueryList<SimpleDateDataFacetComponent>;

  @ViewChild(PreviousVersionDateDataFacetComponent) previousVersionDateDataFacetComponent!: PreviousVersionDateDataFacetComponent;

  @ViewChild(DataGenerationDateRangeDataFacetComponent) dataGenerationDateRangeDataFacetComponent!: DataGenerationDateRangeDataFacetComponent;

  @ViewChild(MethodDataFacetComponent) methodDataFacetComponent!: MethodDataFacetComponent;

  @ViewChild(DataFormatDataFacetComponentV2) dataFormatDataFacetComponent!: DataFormatDataFacetComponentV2;

  @ViewChild(ConfidentialityClassificationDataFacetComponent) confidentialityClassificationDataFacetComponent!: ConfidentialityClassificationDataFacetComponent;

  @ViewChild(ConsentDocumentationLocationDataFacetComponent) consentDocumentationLocationDataFacetComponent!: ConsentDocumentationLocationDataFacetComponent;

  @ViewChild(PrivacyEnhancingTechnologyDataFacetComponent) privacyEnhancingTechnologyDataFacetComponent!: PrivacyEnhancingTechnologyDataFacetComponent;

  @ViewChildren(CheckboxListWithDetailsComponent) checkboxListWithDetailsComponents!: QueryList<CheckboxListWithDetailsComponent>;

  @ViewChild(IntendedDataUseDataFacetComponent) intendedDataUseDataFacetComponent!: IntendedDataUseDataFacetComponent;

  validateAllDataFacets() {
    // Check simple text data facets.
    const simpleTextDataFacetStatuses = this.simpleTextDataFacetComponents.toArray().map(
      (dataFacet) => {
        dataFacet.validate();

        return dataFacet.dataFacetValid;
      }
    );

    const simpleTextDataFacetErrorIndex = simpleTextDataFacetStatuses.indexOf(false);
    if(simpleTextDataFacetErrorIndex >= 0) {
      this.simpleTextDataFacetComponents.toArray()[simpleTextDataFacetErrorIndex].scroll();

      return false;
    }

    // Check data issuer data facet.
    this.dataIssuerDataFacetComponentV2.validate();
    if(!this.dataIssuerDataFacetComponentV2.dataFacetValid) {
      this.dataIssuerDataFacetComponentV2.scroll();
      return false;
    }

    // Check source metadata data facet.
    this.sourceMetadataDataFacetComponent.validate();
    if(!this.sourceMetadataDataFacetComponent.dataFacetValid) {
      this.sourceMetadataDataFacetComponent.scroll();
      return false;
    }

    // Check source data facet.
    this.sourceDataFacetComponentV2.validate();
    if(!this.sourceDataFacetComponentV2.dataFacetValid) {
      this.sourceDataFacetComponentV2.scroll();
      return false;
    }

    // Check geography facets.
    const geographySelectorDataFacetStatuses = this.geographySelectorDataFacetComponents.toArray().map(
      (dataFacet) => {
        dataFacet.validate();

        return dataFacet.dataFacetValid;
      }
    );

    const geographySelectorDataFacetErrorIndex = geographySelectorDataFacetStatuses.indexOf(false);
    if(geographySelectorDataFacetErrorIndex >= 0) {
      this.geographySelectorDataFacetComponents.toArray()[geographySelectorDataFacetErrorIndex].scroll();

      return false;
    }

    // Check simple date data facets.
    const simpleDateDataFacetStatuses = this.simpleDateDataFacetComponents.toArray().map(
      (dataFacet) => {
        dataFacet.validate();

        return dataFacet.dataFacetValid;
      }
    );

    const simpleDateDataFacetErrorIndex = simpleDateDataFacetStatuses.indexOf(false);
    if(simpleDateDataFacetErrorIndex >= 0) {
      this.simpleDateDataFacetComponents.toArray()[simpleDateDataFacetErrorIndex].scroll();

      return false;
    }

    // Check previous version date data facet.
    this.previousVersionDateDataFacetComponent.validate();
    if(!this.previousVersionDateDataFacetComponent.dataFacetValid) {
      this.previousVersionDateDataFacetComponent.scroll();
      return false;
    }

    // Check data generation date range data facet.
    this.dataGenerationDateRangeDataFacetComponent.validate();
    if(!this.dataGenerationDateRangeDataFacetComponent.dataFacetValid) {
      this.dataGenerationDateRangeDataFacetComponent.scroll();
      return false;
    }

    // Check method data facet.
    this.methodDataFacetComponent.validate();
    if(!this.methodDataFacetComponent.dataFacetValid) {
      this.methodDataFacetComponent.scroll();
      return false;
    }

    // Check data format data facet.
    this.dataFormatDataFacetComponent.validate();
    if(!this.dataFormatDataFacetComponent.dataFacetValid) {
      this.dataFormatDataFacetComponent.scroll();
      return false;
    }

    // Check confidentiality classification data facet.
    this.confidentialityClassificationDataFacetComponent.validate();
    if(!this.confidentialityClassificationDataFacetComponent.dataFacetValid) {
      this.confidentialityClassificationDataFacetComponent.scroll();
      return false;
    }

    // Check consent documentation location data facet.
    this.consentDocumentationLocationDataFacetComponent.validate();
    if(!this.consentDocumentationLocationDataFacetComponent.dataFacetValid) {
      this.consentDocumentationLocationDataFacetComponent.scroll();
      return false;
    }

    // Check privacy enhancing technology data facet.
    this.privacyEnhancingTechnologyDataFacetComponent.validate();
    if(!this.privacyEnhancingTechnologyDataFacetComponent.dataFacetValid) {
      this.privacyEnhancingTechnologyDataFacetComponent.scroll();
      return false;
    }

    // Check checkbox list with details data facets.
    const checkboxListWithDetailsStatuses = this.checkboxListWithDetailsComponents.toArray().map(
      (dataFacet) => {
        dataFacet.validate();

        return dataFacet.dataFacetValid;
      }
    );

    const checkboxListWithDetailsErrorIndex = checkboxListWithDetailsStatuses.indexOf(false);
    if(checkboxListWithDetailsErrorIndex >= 0) {
      this.checkboxListWithDetailsComponents.toArray()[checkboxListWithDetailsErrorIndex].scroll();

      return false;
    }

    // Check intended data use data facet.
    this.intendedDataUseDataFacetComponent.validate();
    if(!this.intendedDataUseDataFacetComponent.dataFacetValid) {
      this.intendedDataUseDataFacetComponent.scroll();
      return false;
    }

    return true;
  };

  downloadOption = {
    csv: false,
    json: false,
    yaml: false,
    xml: false
  };

  downloadButtonText: string = "Generate metadata files";

  download() {
    console.log("Clicked download button", this.downloadOption);
    const dataFacetsValid = this.validateAllDataFacets();

    if(dataFacetsValid) {
      // Disable consent to data collection checkbox.
      this.consentToDataCollectionAuthorized = false;

      const generatedEntity = this.generateDataStandardEntity();

      // Submit data to server.
      const dataStoreEntity = {
        id: uuid(),
        metadata: generatedEntity
      };

      this.cosmosDsProxyApiService.storeDataToDatabase(dataStoreEntity).subscribe(
        (event: any) => {
          console.log("Submitted data to data store.", event);
        }
      );

      if(this.downloadOption.csv) {
        this.downloadObjectAsCsv(generatedEntity, "data-standard-export");
      }

      if(this.downloadOption.json) {
        this.downloadObjectAsJson(generatedEntity, "data-standard-export");
      }

      if(this.downloadOption.yaml) {
        this.downloadObjectAsYaml(generatedEntity, "data-standard-export");
      }

      if(this.downloadOption.xml) {
        this.downloadObjectAsXml(generatedEntity, "data-standard-export");
      }

      // Update download button text.
      this.downloadButtonText = "Generate additional metadata files";
    }
  };

  consentToDataCollectionAuthorized: boolean = false;

  showMetadataPrivacyPolicy: boolean = false;

  downloadObjectAsCsv(exportObj: any, exportName: string) {
    try {
      const parser = new Parser(
        {
          transforms: [
            flatten({objects: true, arrays: true})
          ]
        }
      );
      const csv = parser.parse(exportObj);

      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(csv);
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".csv");
      document.body.appendChild(downloadAnchorNode); // Required for firefox.
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } catch (err) {
      console.error(err);
    }
  };

  downloadObjectAsJson(exportObj: any, exportName: string) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // Required for firefox.
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  downloadObjectAsYaml(exportObj: any, exportName: string) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(YAML.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".yaml");
    document.body.appendChild(downloadAnchorNode); // Required for firefox.
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  downloadObjectAsXml(exportObj: any, exportName: string) {
    // Export object needs a metadata wrapper to use as tag.
    var metadataEntity = new Map();
    metadataEntity.set("metadata", exportObj);
    const metadataJsonObject = Object.fromEntries(metadataEntity);

    const options = {
      compact: true,
      spaces: 2
    };
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(xmljs.js2xml(metadataJsonObject, options));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".xml");
    document.body.appendChild(downloadAnchorNode); // Required for firefox.
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
}
