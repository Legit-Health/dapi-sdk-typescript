import BodySiteCode from './BodySite/BodySiteCode';
import MediaAnalyzerArguments from './MediaAnalyzerArguments';
import Operator from './Operator/Operator';
import Subject from './Subject/Subject';

export default class PredictArguments extends MediaAnalyzerArguments {
  constructor(
    requestId: string,
    content: string,
    bodySiteCode: BodySiteCode | null = null,
    operator: Operator | null = null,
    subject: Subject | null = null
  ) {
    super(requestId, content, bodySiteCode, null, [], operator, subject);
  }
}
