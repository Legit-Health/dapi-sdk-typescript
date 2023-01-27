import Questionnaire from './Questionnaire';

export default class Pure4Questionnaire extends Questionnaire {
  constructor(
    public readonly question1Pure: number,
    public readonly question2Pure: number,
    public readonly question3Pure: number,
    public readonly question4Pure: number
  ) {
    super();
    this.ensureIsInRange(question1Pure, 0, 1, 'question1Pure');
    this.ensureIsInRange(question2Pure, 0, 1, 'question2Pure');
    this.ensureIsInRange(question3Pure, 0, 1, 'question3Pure');
    this.ensureIsInRange(question4Pure, 0, 1, 'question4Pure');
  }

  public getName(): string {
    return 'PURE4';
  }

  public asObject() {
    return {
      question1Pure: this.question1Pure,
      question2Pure: this.question2Pure,
      question3Pure: this.question3Pure,
      question4Pure: this.question4Pure
    };
  }
}
