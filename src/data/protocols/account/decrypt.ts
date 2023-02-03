export interface DecryptHash {
  compare: (string: string, hash: string) => Promise<boolean>;
}
