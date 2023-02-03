export interface CreateJwt {
  encrypt: (_id: string) => Promise<string>;
}
