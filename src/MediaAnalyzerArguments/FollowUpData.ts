import BodySiteCode from './BodySite/BodySiteCode';
import MediaAnalyzerData from './MediaAnalyzerData';
import Operator from './Operator/Operator';
import PreviousMedia from './PreviousMedia/PreviousMedia';
import Questionnaires from './Questionnaires/Questionnaires';
import Subject from './Subject/Subject';
import View from './View/View';

export default class FollowUpData extends MediaAnalyzerData {
  constructor(
    content: string,
    pathologyCode: string,
    bodySiteCode: BodySiteCode | null = null,
    previousMedias: PreviousMedia[] = [],
    operator: Operator | null = null,
    subject: Subject | null = null,
    scoringSystems: string[] = [],
    questionnaires = new Questionnaires([]),
    view: View | null = null
  ) {
    super(
      content,
      bodySiteCode,
      pathologyCode,
      previousMedias,
      operator,
      subject,
      scoringSystems,
      questionnaires,
      view
    );
  }
}
