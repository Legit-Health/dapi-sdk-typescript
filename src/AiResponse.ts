export default interface AiResponse {
  conclusions:
    | undefined
    | {
        name: string;
        probability: number;
        code: {
          code: string;
          codeSystem: string;
        };
      }[];
  preliminaryFindings: {
    hasConditionSuspicion: number;
    isPreMalignantSuspicion: number;
    isMalignantSuspicion: number | null;
    needsBiopsySuspicion: number;
    needsSpecialistsAttention: number;
  };
  detectedModality: string;
  mediaValidity: {
    isValid: boolean;
    score: number;
    metrics: Record<string, boolean>;
  };
  metrics: {
    sensitivity: number;
    specificity: number;
  };
  time: number;
  explainabilityMedia: {
    content: string;
  };
  evolution?: {
    domains: Record<string, any>;
  };
}
