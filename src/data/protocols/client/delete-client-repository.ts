export interface DeleteClientRepository {
  delete: (_id: string) => Promise<boolean>;
}
