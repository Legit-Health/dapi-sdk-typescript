import Questionnaire from './Questionnaire';

export default class Pure4Questionnaire extends Questionnaire {
  constructor(
    public readonly question1_pure: number,
    public readonly question2_pure: number,
    public readonly question3_pure: number,
    public readonly question4_pure: number
  ) {
    super();
    this.ensureIsInRange(question1_pure, 0, 1, 'question1_pure');
    this.ensureIsInRange(question2_pure, 0, 1, 'question2_pure');
    this.ensureIsInRange(question3_pure, 0, 1, 'question3_pure');
    this.ensureIsInRange(question4_pure, 0, 1, 'question4_pure');
  }

  public getName(): string {
    return 'PURE4';
  }

  public asObject(): Record<string, any> {
    return {
      question1_pure: this.question1_pure,
      question2_pure: this.question2_pure,
      question3_pure: this.question3_pure,
      question4_pure: this.question4_pure
    };
  }
}
