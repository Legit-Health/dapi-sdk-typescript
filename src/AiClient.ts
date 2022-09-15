import axios from 'axios';
import AiResponse from './AiResponse';
import FollowUpArguments from './MediaAnalyzerArguments/FollowUpArguments';
import MediaAnalyzerArguments from './MediaAnalyzerArguments/MediaAnalyzerArguments';
import PredictArguments from './MediaAnalyzerArguments/PredictArguments';
import MediaAnalyzerError, {ErrorCode} from './MediaAnalyzerError';

export default class AiClient {
  constructor(private readonly baseUri: string, private readonly analyzerApiKey: string) {}

  predict(predictArguments: PredictArguments): Promise<AiResponse> {
    return this.send(predictArguments);
  }

  followUp(followUpArguments: FollowUpArguments): Promise<AiResponse> {
    return this.send(followUpArguments);
  }

  private async send(mediaAnalyzerArguments: MediaAnalyzerArguments): Promise<AiResponse> {
    try {
      const response = await axios.post(
        `${this.baseUri}/v2/legit_health/predict`,
        mediaAnalyzerArguments.asApiRequest(),
        {
          headers: {
            'x-api-key': this.analyzerApiKey
          }
        }
      );
      if (response.status !== 200) {
        throw new MediaAnalyzerError('Invalid response', ErrorCode.Request, response.status);
      }
      const json = response.data;
      return json;
    } catch (error) {
      throw new MediaAnalyzerError(
        error instanceof Error ? error.message : 'Unknown error.',
        ErrorCode.AiClient
      );
    }
  }
}
