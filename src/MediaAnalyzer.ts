import AiClient from './AiClient';
import FollowUpArguments from './MediaAnalyzerArguments/FollowUpArguments';
import PredictArguments from './MediaAnalyzerArguments/PredictArguments';
import MediaAnalyzerResponse from './MediaAnalyzerResponse/MediaAnalyzerResponse';

export default class MediaAnalyzer {
  private aiClient: AiClient;

  constructor(baseUri: string, analyzerApiKey: string) {
    this.aiClient = new AiClient(baseUri, analyzerApiKey);
  }

  async predict(predictArguments: PredictArguments): Promise<MediaAnalyzerResponse> {
    const json = await this.aiClient.predict(predictArguments);
    return MediaAnalyzerResponse.fromJson(json);
  }

  async followUp(followUpArguments: FollowUpArguments): Promise<MediaAnalyzerResponse> {
    const json = await this.aiClient.followUp(followUpArguments);
    return MediaAnalyzerResponse.fromJson(json);
  }
}
