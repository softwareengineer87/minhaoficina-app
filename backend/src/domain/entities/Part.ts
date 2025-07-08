import { v4 as uuidv4 } from 'uuid';
class Part {

  partId: string;
  launchId: string;
  name: string;
  value: number;

  constructor(
    partId: string,
    launchId: string,
    name: string,
    value: number
  ) {
    this.partId = partId;
    this.launchId = launchId;
    this.name = name;
    this.value = value;
  }

  static create(launchId: string, name: string, value: number) {
    const partId = uuidv4();
    return new Part(
      partId,
      launchId,
      name,
      value
    );
  }

}

export { Part }

