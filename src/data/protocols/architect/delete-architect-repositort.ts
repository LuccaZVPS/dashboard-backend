export interface DeleteArchitectRepository {
  delete: (_id: string) => Promise<void>;
}
