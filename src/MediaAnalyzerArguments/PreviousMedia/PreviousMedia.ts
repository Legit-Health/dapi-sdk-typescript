export default class PreviousMedia {
  constructor(public readonly base64: string, public readonly date: Date) {}

  asObject() {
    return {
      base64: this.base64,
      date: this.date
    };
  }
}
