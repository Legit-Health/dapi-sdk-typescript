import Questionnaire from './Questionnaire';

export default class ScovidQuestionnaire extends Questionnaire {
  constructor(
    public readonly pain: number,
    public readonly itchiness_scorad: number,
    public readonly fever: number,
    public readonly cough: number,
    public readonly cephalea: number,
    public readonly myalgiaorarthralgia: number,
    public readonly malaise: number,
    public readonly lossoftasteorolfactory: number,
    public readonly shortnessofbreath: number,
    public readonly otherskinproblems: number
  ) {
    super();
    this.ensureIsInRange(pain, 0, 10, 'pain');
    this.ensureIsInRange(itchiness_scorad, 0, 10, 'itchiness_scorad');
    this.ensureIsInRange(fever, 0, 3, 'fever');
    this.ensureIsInRange(cough, 0, 3, 'cough');
    this.ensureIsInRange(cephalea, 0, 3, 'cephalea');
    this.ensureIsInRange(myalgiaorarthralgia, 0, 3, 'myalgiaorarthralgia');
    this.ensureIsInRange(malaise, 0, 3, 'malaise');
    this.ensureIsInRange(lossoftasteorolfactory, 0, 3, 'lossoftasteorolfactory');
    this.ensureIsInRange(shortnessofbreath, 0, 3, 'shortnessofbreath');
    this.ensureIsInRange(otherskinproblems, 0, 3, 'otherskinproblems');
  }

  public getName(): string {
    return 'SCOVID';
  }

  public asObject(): Record<string, any> {
    return {
      pain: this.pain,
      itchiness_scorad: this.itchiness_scorad,
      fever: this.fever,
      cough: this.cough,
      cephalea: this.cephalea,
      myalgiaorarthralgia: this.myalgiaorarthralgia,
      malaise: this.malaise,
      lossoftasteorolfactory: this.lossoftasteorolfactory,
      shortnessofbreath: this.shortnessofbreath,
      otherskinproblems: this.otherskinproblems
    };
  }
}
