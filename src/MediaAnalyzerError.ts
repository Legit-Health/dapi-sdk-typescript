export enum ErrorCode {
  AiClient = 1,
  Request = 2
}

export default class MediaAnalyzerError extends Error {
  constructor(message: string, public code: ErrorCode, public statusCode?: number) {
    super(message);
  }
}
