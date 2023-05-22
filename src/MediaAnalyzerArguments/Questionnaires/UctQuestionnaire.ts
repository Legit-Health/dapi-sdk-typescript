import Questionnaire from './Questionnaire';

export default class UctQuestionnaire extends Questionnaire {
  constructor(
    public readonly question1Uct: number,
    public readonly question2Uct: number,
    public readonly question3Uct: number,
    public readonly question4Uct: number
  ) {
    super();
    this.ensureIsInRange(question1Uct, 0, 4, 'question1Uct');
    this.ensureIsInRange(question2Uct, 0, 4, 'question2Uct');
    this.ensureIsInRange(question3Uct, 0, 4, 'question3Uct');
    this.ensureIsInRange(question4Uct, 0, 4, 'question4Uct');
  }

  public getName(): string {
    return 'UCT';
  }

  public asObject() {
    return {
      question1Uct: this.question1Uct,
      question2Uct: this.question2Uct,
      question3Uct: this.question3Uct,
      question4Uct: this.question4Uct
    };
  }
}
