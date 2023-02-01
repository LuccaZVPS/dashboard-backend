export class Contoller {
  handle: (_: any, data: Data, context: context) => Promise<any>;
}
interface Data {
  data: any;
}
interface context {
  userId: string;
}
