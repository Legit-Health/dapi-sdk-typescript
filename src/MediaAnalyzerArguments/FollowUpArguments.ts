import BodySiteCode from './BodySite/BodySiteCode';
import MediaAnalyzerArguments from './MediaAnalyzerArguments';
import Operator from './Operator/Operator';
import PreviousMedia from './PreviousMedia/PreviousMedia';
import Questionnaires from './Questionnaires/Questionnaires';
import Subject from './Subject/Subject';

export default class FollowUpArguments extends MediaAnalyzerArguments {
  constructor(
    requestId: string,
    content: string,
    pathologyCode: string,
    bodySiteCode: BodySiteCode | null = null,
    previousMedias: PreviousMedia[] = [],
    operator: Operator | null = null,
    subject: Subject | null = null,
    scoringSystems: string[] = [],
    questionnaires = new Questionnaires([])
  ) {
    super(
      requestId,
      content,
      bodySiteCode,
      pathologyCode,
      previousMedias,
      operator,
      subject,
      scoringSystems,
      questionnaires
    );
  }
}
