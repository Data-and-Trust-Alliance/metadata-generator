import { v4 as uuid } from 'uuid';

export class CheckboxDetailsEntry {
  uuid: string = "";
  value: string = "";

  constructor() {
    this.uuid = uuid();
    this.value = "";
  }
}
