export interface CreateJwt {
  encrypt: () => Promise<string>;
}
