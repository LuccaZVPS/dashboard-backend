export interface DTOValidator {
  validate: (classModel: any) => Promise<error>;
}
export interface error {
  errors: string;
}
