const STORAGE_KEY = "neural_fit_bio_analysis_v1";
const STORAGE_FULL_ANALYSIS_KEY = "neural_fit_full_analysis_v1";

export function saveBioAnalysisResult(result) {
  if (!result || typeof result !== "object") {
    throw new Error("Resultado inválido para guardar.");
  }

  const payload = {
    savedAt: new Date().toISOString(),
    data: result,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function getBioAnalysisResult() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("No se pudo parsear el resultado guardado.", error);
    return null;
  }
}

export function clearBioAnalysisResult() {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveFullAnalysisResult(bioResult, nutritionResult) {
  if (!bioResult || typeof bioResult !== "object") {
    throw new Error("Resultado biomecánico inválido.");
  }
  if (!nutritionResult || typeof nutritionResult !== "object") {
    throw new Error("Resultado nutricional inválido.");
  }

  const payload = {
    savedAt: new Date().toISOString(),
    bio: bioResult,
    nutrition: nutritionResult,
  };

  localStorage.setItem(STORAGE_FULL_ANALYSIS_KEY, JSON.stringify(payload));
  // Mantiene compatibilidad con el flujo anterior
  saveBioAnalysisResult(bioResult);
  return payload;
}

export function getFullAnalysisResult() {
  const raw = localStorage.getItem(STORAGE_FULL_ANALYSIS_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("No se pudo parsear el analisis completo guardado.", error);
    return null;
  }
}
