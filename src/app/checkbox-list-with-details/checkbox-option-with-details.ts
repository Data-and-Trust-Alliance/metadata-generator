import { v4 as uuid } from 'uuid';

import { CheckboxDetailsEntry } from './checkbox-details-entry';

export class CheckboxOptionWithDetails {
  uuid: string = "";
  label: string = "";
  enabled: boolean = false;
  detailsEnabled: boolean = false;
  detailsLabel: string = "";
  detailsPreviewText: string = "";
  detailsButtonText: string = "";
  detailsEntries: CheckboxDetailsEntry[] = [];

  constructor(label: string, enabled: boolean, detailsEnabled: boolean, detailsLabel: string, detailsPreviewText: string, detailsButtonText: string, detailsEntries: CheckboxDetailsEntry[]) {
    this.uuid = uuid();
    this.label = label;
    this.enabled = enabled;
    this.detailsEnabled = detailsEnabled;
    this.detailsLabel = detailsLabel;
    this.detailsPreviewText = detailsPreviewText;
    this.detailsButtonText = detailsButtonText;
    this.detailsEntries = detailsEntries;
  }

  static labelOnly(label: string) {
    return new CheckboxOptionWithDetails(label, false, false, "", "", "", []);
  }

  static labelWithDetails(label: string, detailsLabel: string, detailsPreviewText: string, detailsButtonText: string) {
    return new CheckboxOptionWithDetails(label, false, true, detailsLabel, detailsPreviewText, detailsButtonText, []);
  }
}
