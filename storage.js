const STORAGE_KEY = "neural_fit_bio_analysis_v1";

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
