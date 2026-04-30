export type Sexo = "male" | "female";
export type Biotipo = "ectomorph" | "mesomorph" | "endomorph";

export interface BioInput {
  heightCm: number;
  femurCm: number;
  weightKg?: number;
  sexo?: Sexo;
}

export interface BioAnalysisResult {
  femurRatio: number;
  femurCategory: "short" | "balanced" | "long";
  isLongFemur: boolean;
  biotipo: Biotipo;
  confidence: number;
  notes: string[];
}

export interface VisualProportionSnapshot {
  cuadricipiteScore: number;
  caderaPostureScore: number;
  timestamp?: string;
}

export interface VisualComparisonResult {
  improvementPercent: number;
  summary: string;
  focusAreas: string[];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Motor de Phase 1 (Bio-Analysis):
 * - Detecta fémur largo por ratio fémur/altura.
 * - Estima biotipo con relación peso-altura y el ratio femoral.
 */
export function analyzeBiotype(input: BioInput): BioAnalysisResult {
  if (input.heightCm <= 0 || input.femurCm <= 0) {
    throw new Error("heightCm y femurCm deben ser mayores que 0.");
  }

  const femurRatio = input.femurCm / input.heightCm;
  const isLongFemur = femurRatio >= 0.268;

  let femurCategory: "short" | "balanced" | "long" = "balanced";
  if (femurRatio < 0.24) femurCategory = "short";
  if (femurRatio >= 0.268) femurCategory = "long";

  let biotipo: Biotipo = "mesomorph";
  const notes: string[] = [];

  if (input.weightKg && input.weightKg > 0) {
    const heightM = input.heightCm / 100;
    const bmi = input.weightKg / (heightM * heightM);

    if (bmi < 20.5) biotipo = "ectomorph";
    else if (bmi > 26.5) biotipo = "endomorph";
    else biotipo = "mesomorph";

    notes.push(`BMI estimado: ${round2(bmi)}`);
  } else {
    // Sin peso, priorizamos señal estructural del fémur
    if (femurCategory === "long") biotipo = "ectomorph";
    if (femurCategory === "short") biotipo = "endomorph";
    notes.push("Biotipo estimado sin peso corporal (modo estructural).");
  }

  if (isLongFemur) {
    notes.push("Fémur largo detectado: considerar ajuste de palancas en entrenamiento.");
  }

  const confidenceBase = input.weightKg ? 0.86 : 0.72;
  const confidence = clamp(
    confidenceBase + (femurCategory === "balanced" ? 0.02 : 0),
    0.6,
    0.95
  );

  return {
    femurRatio: round2(femurRatio),
    femurCategory,
    isLongFemur,
    biotipo,
    confidence: round2(confidence),
    notes,
  };
}

/**
 * Phase 3 (Visual Evolution Diary):
 * Compara snapshots visuales y, en usuarios con femur largo,
 * enfatiza cambios de volumen de cuadriceps y postura de cadera.
 */
export function compareVisualProportions(
  previous: VisualProportionSnapshot,
  current: VisualProportionSnapshot,
  bio: Pick<BioAnalysisResult, "isLongFemur" | "biotipo">
): VisualComparisonResult {
  const safePreviousQuad = Math.max(previous.cuadricipiteScore, 1);
  const safePreviousHip = Math.max(previous.caderaPostureScore, 1);

  const quadDelta = ((current.cuadricipiteScore - previous.cuadricipiteScore) / safePreviousQuad) * 100;
  const hipDelta = ((current.caderaPostureScore - previous.caderaPostureScore) / safePreviousHip) * 100;

  const weightedImprovement = bio.isLongFemur ? quadDelta * 0.65 + hipDelta * 0.35 : quadDelta * 0.5 + hipDelta * 0.5;
  const improvementPercent = round2(Math.max(weightedImprovement, -100));

  const focusAreas = bio.isLongFemur
    ? [
        `Cambio de cuadriceps: ${round2(quadDelta)}%`,
        `Cambio de postura de cadera: ${round2(hipDelta)}%`,
      ]
    : [`Cambio muscular global: ${round2(quadDelta)}%`, `Cambio postural global: ${round2(hipDelta)}%`];

  const summary =
    bio.isLongFemur
      ? `Perfil con femur largo: la comparacion prioriza cuadriceps y control de cadera (${improvementPercent}%).`
      : `Comparacion visual general completada (${improvementPercent}%).`;

  return {
    improvementPercent,
    summary,
    focusAreas,
  };
}
