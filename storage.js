const STORAGE_KEY = "neural_fit_bio_analysis_v1";
const STORAGE_FULL_ANALYSIS_KEY = "neural_fit_full_analysis_v1";
const STORAGE_VISUAL_REFS_KEY = "neural_fit_visual_refs_v1";
const STORAGE_VISUAL_DIARY_KEY = "neural_fit_visual_diary_v1";
const STORAGE_PERIMETER_HISTORY_KEY = "neural_fit_perimeter_history_v1";

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

export function savePhotoReferences(photoRefs) {
  if (!photoRefs || typeof photoRefs !== "object") {
    throw new Error("Referencias de fotos inválidas.");
  }

  const payload = {
    savedAt: new Date().toISOString(),
    refs: photoRefs,
  };
  localStorage.setItem(STORAGE_VISUAL_REFS_KEY, JSON.stringify(payload));
  return payload;
}

export function getPhotoReferences() {
  const raw = localStorage.getItem(STORAGE_VISUAL_REFS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("No se pudo parsear referencias de fotos.", error);
    return null;
  }
}

export function saveVisualDiaryEntry(entry) {
  const raw = localStorage.getItem(STORAGE_VISUAL_DIARY_KEY);
  const list = raw ? JSON.parse(raw) : [];
  const next = [...list, { ...entry, savedAt: new Date().toISOString() }];
  localStorage.setItem(STORAGE_VISUAL_DIARY_KEY, JSON.stringify(next));
  return next[next.length - 1];
}

export function getVisualDiaryEntries() {
  const raw = localStorage.getItem(STORAGE_VISUAL_DIARY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("No se pudo parsear historial visual.", error);
    return [];
  }
}

export function savePerimeterRecord(record) {
  if (!record || typeof record !== "object") {
    throw new Error("Registro de perimetros invalido.");
  }

  const raw = localStorage.getItem(STORAGE_PERIMETER_HISTORY_KEY);
  const list = raw ? JSON.parse(raw) : [];
  const nextRecord = { ...record, savedAt: new Date().toISOString() };
  const next = [...list, nextRecord];
  localStorage.setItem(STORAGE_PERIMETER_HISTORY_KEY, JSON.stringify(next));
  return nextRecord;
}

export function getPerimeterHistory() {
  const raw = localStorage.getItem(STORAGE_PERIMETER_HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("No se pudo parsear historial de perimetros.", error);
    return [];
  }
}
