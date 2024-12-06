import { v4 as uuid } from 'uuid';

export class ConfidentialityClassificationTool {
  uuid: string = "";
  value: string = "";

  constructor() {
    this.uuid = uuid();
    this.value = "";
  }
}
