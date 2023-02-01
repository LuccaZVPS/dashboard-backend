export interface DTOValidator {
  validate: (classModel: any) => Promise<error>;
}
interface error {
  errors: string;
}
