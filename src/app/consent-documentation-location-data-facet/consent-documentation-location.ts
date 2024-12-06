import { v4 as uuid } from 'uuid';

export class ConsentDocumentationLocation {
  uuid: string = "";
  value: string = "";

  constructor() {
    this.uuid = uuid();
    this.value = "";
  }
}
