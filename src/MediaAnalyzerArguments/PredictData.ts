import BodySiteCode from './BodySite/BodySiteCode';
import MediaAnalyzerData from './MediaAnalyzerData';
import Operator from './Operator/Operator';
import Questionnaires from './Questionnaires/Questionnaires';
import Subject from './Subject/Subject';
import View from './View/View';

export default class PredictData extends MediaAnalyzerData {
  constructor(
    content: string,
    bodySiteCode: BodySiteCode | null = null,
    operator: Operator | null = null,
    subject: Subject | null = null,
    view: View | null = null
  ) {
    super(content, bodySiteCode, null, [], operator, subject, [], new Questionnaires([]), view);
  }
}
