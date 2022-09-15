import Questionnaire from './Questionnaire';

export default class UasLocalQuestionnaire extends Questionnaire {
  constructor(public readonly itchiness: number, public readonly hiveNumber: number) {
    super();
    this.ensureIsInRange(itchiness, 0, 3, 'itchiness');
  }

  public getName(): string {
    return 'UAS_LOCAL';
  }

  public asObject(): Record<string, any> {
    return {
      itchiness: this.itchiness,
      hiveNumber: this.hiveNumber
    };
  }
}
