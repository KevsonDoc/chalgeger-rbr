export class ValidationExeption extends Error {
  constructor(public messages: string[] = []) {
    super(messages[0]);
  }
}
