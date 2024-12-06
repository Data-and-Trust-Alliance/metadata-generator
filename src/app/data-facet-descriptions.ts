export class DataFacetDescriptions {
  static readonly datasetTitle: string = "This is the official name of the dataset, which should be descriptive and help easily identify the dataset's content and purpose. The data supplier should provide a concise but descriptive name. For example, '2023 Customer Satisfaction Survey Data'. There are no character limits, but best practice is to limit the assigned name to 31 characters.";

  static readonly metadataId: string = "This field must contain a distinct identifier (such as a Universally Unique Identifier or UUID) assigned to the dataset's metadata to uniquely distinguish it from others, ensuring no confusion or overlap. A UUID is represented as hexadecimal digits in five groups separated by hyphens, for example, c75f7c66-e858-47d6-bb82-7ea5547c800c. If your organization does not have a standardized tool for generating a UUID, there are plenty of free online UUID generators, and the probability of a duplicate being created is extremely small.";

  static readonly metadataLocation: string = "This field is designed to capture a web address where the dataset's metadata is published and can be accessed, providing a direct link to detailed information about the dataset. For example, 'https://data-provider.com/metadata/12345'.";

  static readonly dataIssuer: string = "This field must contain the name and address of the legal entity responsible for providing the dataset, ensuring accountability and a point of contact for inquires. Enter in this field the name of the legal entity that created the dataset, for example, 'XYZ Corporation' and the legal entity's business address.";

  static readonly datasetDescription: string = "This field must contain a detailed narrative that explains the contents, scope, and purpose of the dataset. It provides essential contextual information that helps users understand what the data represents, how it was collected, and any limitations or recommended uses. Enter a comprehensive description that will help the procurement team and data consumers understand the dataset's content, scope, and purpose. You should write a detailed description covering key aspects. For example, 'This dataset includes survey responses from over 10,000 customers, collected to gauge satisfaction levels across various service areas'.";

  static readonly sourceMetadata: string = "Identifies where the metadata for any source datasets that contribute to the current dataset can be found, establishing lineage and dependencies. This field establishes lineage. In this field, provide the metadata location or reference for any source datasets. For example, 'Metadata available at 'https://data-provider.com/metadata/source123'.";

  static readonly source: string = "This field identifies whether the data originates from a different organization than the one who issued the dataset, and identifies that original source's legal name. In this field, enter the name of the original data source if different from the issuer. For example, 'ABC Data Services'.";

  static readonly dataOriginLocation: string = "The geographical location where the data was originally collected, which can be important for compliance with regional laws and understanding the data's context. In this field, indicate the geographic location, by selecting the country and state from where the data originated. If there are multiple locations, indicate that by adding additional rows.";

  static readonly datasetIssueDate: string = "This field must contain the date when the dataset was compiled or created, providing a temporal context for the data. Provide the date in the ISO8601 standard format, for example, '2024-01-01T00:00:00'.";

  static readonly previousVersionDate: string = "This field is intended to capture the release date of the last version of the dataset, if it has been updated or revised, to track changes and updates over time. Provide the date in the ISO8601 standard format, for example, '2024-01-01T00:00:00'.";

  static readonly dataGenerationDateRange: string = "These fields represent the span of time during which the data within the dataset was collected or generated, offering insight into the datasets's timeliness and relevance. This field helps users understand the dataset's timeliness. You should indicate the date range, for example, '2024-01-01T00:00:00' to '2025-01-01T00:00:00'.";

  static readonly method: string = "This field must account for the methodology, or procedures used to collect, generate, or compile the data, giving insight into its reliability and validity. Understanding the methodology is crucial for assessing data reliability. Describe the data collection method by selecting values from the drop-down options, for example, 'Survey conducted via online questionnaires'.";

  static readonly dataFormat: string = "This field describes the nature of the data within the dataset, such as numerical, textual, or multimedia, helping users understand what kind of information is contained within the file or dataset. Knowing the data format helps users prepare for how to handle the data. In this field you should specify the data format. For example, 'application/json'.";

  static readonly confidentialityClassification: string = "This field must specify the level of sensitivity assigned to the dataset, such as personally identifiable information, which dictates how the dataset must be secured and who can access it. Proper classification ensures data is handled appropriately. Use the checkboxes to indicate the type of confidential information present, such as 'Personally Identifiable Information (PII)'.";

  static readonly consentDocumentationLocation: string = "Specifies where the consent documentation or agreements related to the data can be found, ensuring legal compliance and regulatory use. Documenting consent ensures compliance with data protection regulations. Provide the location of consent documents. For example, 'https://data-provider.com/consent/12345'. If the data contained within the dataset is not personal in nature and does not require a consent for use, ensure the provided checkbox is checked.";

  static readonly privacyEnhancingTechnology: string = "Were privacy enhancing technologies (PETs) or tools applied to the dataset to remove, mask, or modify PII/SPI in the data? Indicate whether techniques were used to protect personally identifiable information (PII) or sensitive personal information (SPI), highlighting the dataset's privacy considerations. This field ensures that privacy measures are clearly communicated. State if PETs were used and describe them. For example, 'ARX' could be the name of the PETs tool used to apply differential privacy techniques to the dataset. You should specify if noise addition was used to obfuscate individual data points, ensuring that the privacy of personally identifiable information (PII) and sensitive personal information (SPI) is maintained.";

  static readonly dataProcessingLocation: string = "This field defines the geographical boundaries within which the data can or cannot be processed, often for legal or regulatory reasons. Use this field to specify any geographic restrictions. For example, if the dataset must be processed within the EU, you should specify all relevant EU countries and select the 'inclusion' option.";

  static readonly dataStorageLocation: string = "This field specifies where the data is stored and any geographical restrictions on storage locations, crucial for compliance with data sovereignty laws. For example, if the dataset must be stored within the EU, you should specify all relevant EU countries and select the 'inclusion' option.";

  static readonly license: string = "Details the terms under which the dataset can be used, including any restrictions or obligations, clarifying legal use and distribution rights. Clear licensing terms ensure legal use and distribution of the dataset.";

  static readonly intendedDataUse: string = "This field must describe the purpose for which the dataset was created, guiding users on its intended use and potential applications against identified use cases. Stating the intended use helps users understand the dataset's purpose. You should describe the intended use, for example, 'AI, Pre-training'.";

  static readonly proprietaryDataPresence: string = "This field must indicate whether the dataset contains proprietary information that is owned by or exclusive to the organization, affecting how it can be shared or used. Knowing if data is proprietary affects how it can be shared. In these fields, indicate if the dataset contains proprietary data subject to copyright, trademark, or patent. For example, if a copyright were applicable, you should enter the contact information for the individual who can speak to the copyright requirements, such as 'Jonathan Reeves, Esq., Email: jreeves@example.com, Phone: +1-555-012-3456'. If no IP restrictions are in place, select 'None'.";
}
