export interface DecryptJwtTs {
  decrypt: (jwt: string) => Promise<any>;
}
