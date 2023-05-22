import AiClient from './AiClient';
import MediaAnalyzerArguments from './MediaAnalyzerArguments/MediaAnalyzerArguments';
import MediaAnalyzerResponse from './MediaAnalyzerResponse/MediaAnalyzerResponse';

export default class MediaAnalyzer {
  private aiClient: AiClient;

  constructor(baseUri: string, analyzerApiKey: string) {
    this.aiClient = new AiClient(baseUri, analyzerApiKey);
  }

  async predict(predictArguments: MediaAnalyzerArguments): Promise<MediaAnalyzerResponse> {
    const json = await this.aiClient.predict(predictArguments);
    return MediaAnalyzerResponse.fromJson(json);
  }

  async followUp(followUpArguments: MediaAnalyzerArguments): Promise<MediaAnalyzerResponse> {
    const json = await this.aiClient.followUp(followUpArguments);
    return MediaAnalyzerResponse.fromJson(json);
  }
}
