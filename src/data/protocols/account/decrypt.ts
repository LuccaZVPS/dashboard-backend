export interface DecryptHash {
  decrypt: (string: string) => Promise<string>;
}
