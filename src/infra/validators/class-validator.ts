import { Validate } from "class-validator";
export class Validator {
  async validate(classModel: any) {
    const isCorrect = Validate(classModel);
  }
}
