import BodySiteCode from './BodySite/BodySiteCode';
import Operator from './Operator/Operator';
import PreviousMedia from './PreviousMedia/PreviousMedia';
import Questionnaires from './Questionnaires/Questionnaires';
import Subject from './Subject/Subject';

export default class MediaAnalyzerArguments {
  constructor(
    readonly requestId: string,
    readonly content: string,
    readonly bodySiteCode: BodySiteCode | null = null,
    readonly pathologyCode: string | null = null,
    readonly previousMedias: PreviousMedia[],
    readonly operator: Operator | null = null,
    readonly subject: Subject | null = null,
    readonly scoringSystems: any[] = [],
    readonly questionnaires: Questionnaires = new Questionnaires([])
  ) {}

  asApiRequest(): Record<string, any> {
    return {
      requestId: this.requestId,
      data: {
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
        questionnaireResponse: this.questionnaires.asObject()
      }
    };
  }
}
