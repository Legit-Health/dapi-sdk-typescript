import Questionnaire from './Questionnaire';

export default class Ihs4LocalQuestionnaire extends Questionnaire {
  constructor(
    public readonly noduleNumber: number,
    public readonly abscesseNumber: number,
    public readonly drainingTunnelNumber: number
  ) {
    super();
  }

  public getName(): string {
    return 'IHS4_LOCAL';
  }

  public asObject(): Record<string, any> {
    return {
      noduleNumber: this.noduleNumber,
      abscesseNumber: this.abscesseNumber,
      drainingTunnelNumber: this.drainingTunnelNumber
    };
  }
}
