import BodySiteCode from './BodySite/BodySiteCode';
import Operator from './Operator/Operator';
import PreviousMedia from './PreviousMedia/PreviousMedia';
import Questionnaires from './Questionnaires/Questionnaires';
import Subject from './Subject/Subject';
import View from './View/View';

export default class MediaAnalyzerData {
  constructor(
    readonly content: string,
    readonly bodySiteCode: BodySiteCode | null = null,
    readonly pathologyCode: string | null = null,
    readonly previousMedias: PreviousMedia[],
    readonly operator: Operator | null = null,
    readonly subject: Subject | null = null,
    readonly scoringSystems: string[] = [],
    readonly questionnaires: Questionnaires = new Questionnaires([]),
    readonly view: View | null = null
  ) {}

  asObject() {
    return {
      type: 'image',
      modality: 'clinical',
      operator: this.operator ?? null,
      content: this.content,
      bodySite: this.bodySiteCode,
      knownConditionForThisImage: {
        conclusion: this.pathologyCode
      },
      previousMedia: this.previousMedias.map((previousMedia) => previousMedia.asObject()),
      subject: this.subject?.asObject() ?? null,
      scoringSystems: this.scoringSystems,
      questionnaireResponse: this.questionnaires.asObject(),
      view: this.view?.asObject() ?? null
    };
  }
}
