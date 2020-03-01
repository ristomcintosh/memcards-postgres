export default class ClientError {
  message: string;
  statusCode: number;

  constructor(mes: string, code: number) {
    this.message = mes;
    this.statusCode = code;
  }
}
