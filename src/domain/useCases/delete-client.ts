export interface DeleteClient {
  delete: (_id: string) => Promise<boolean>;
}
