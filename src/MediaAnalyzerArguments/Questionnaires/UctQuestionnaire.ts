import Questionnaire from './Questionnaire';

export default class UctQuestionnaire extends Questionnaire {
  constructor(
    public readonly question1_uct: number,
    public readonly question2_uct: number,
    public readonly question3_uct: number,
    public readonly question4_uct: number
  ) {
    super();
    this.ensureIsInRange(question1_uct, 0, 4, 'question1_uct');
    this.ensureIsInRange(question2_uct, 0, 4, 'question2_uct');
    this.ensureIsInRange(question3_uct, 0, 4, 'question3_uct');
    this.ensureIsInRange(question4_uct, 0, 4, 'question4_uct');
  }

  public getName(): string {
    return 'UCT';
  }

  public asObject(): Record<string, any> {
    return {
      question1_uct: this.question1_uct,
      question2_uct: this.question2_uct,
      question3_uct: this.question3_uct,
      question4_uct: this.question4_uct
    };
  }
}
