import { analyzeBiotype, type BioInput } from "./ai-engine";
import { buildNutritionSuggestion } from "./nutrition-engine";
import { saveFullAnalysisResult } from "./storage.js";

export interface IntegratedAnalysisResult {
  bio: ReturnType<typeof analyzeBiotype>;
  nutrition: ReturnType<typeof buildNutritionSuggestion>;
  savedAt: string;
}

/**
 * Flujo principal:
 * 1) Calcula resultado biomecanico
 * 2) Calcula recomendacion nutricional ligada al biotipo detectado
 * 3) Guarda ambos resultados automaticamente en storage
 */
export function completeUserAnalysis(input: BioInput): IntegratedAnalysisResult {
  const bio = analyzeBiotype(input);
  const nutrition = buildNutritionSuggestion(bio);
  const saved = saveFullAnalysisResult(bio, nutrition);

  return {
    bio,
    nutrition,
    savedAt: saved.savedAt,
  };
}
