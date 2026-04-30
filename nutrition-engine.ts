import type { BioAnalysisResult } from "./ai-engine";

export type FoodCategory = "protein" | "carb" | "fat";

export interface LocalFood {
  name: string;
  category: FoodCategory;
  serving: string;
  protein: number;
  carbs: number;
  fat: number;
  slowAbsorptionCarb?: boolean;
  budgetTier: "low" | "mid";
}

export interface FoodSwapRecommendation {
  targetCategory: FoodCategory;
  replace: string;
  with: string;
  reason: string;
}

export interface NutritionPlanSuggestion {
  profile: string;
  prioritizedFoods: LocalFood[];
  economicalSwaps: FoodSwapRecommendation[];
  notes: string[];
}

export const LOCAL_FOODS_VENEZUELA: LocalFood[] = [
  // Proteinas
  { name: "Sardina fresca", category: "protein", serving: "100 g", protein: 24, carbs: 0, fat: 11, budgetTier: "low" },
  { name: "Sardina en lata", category: "protein", serving: "100 g", protein: 23, carbs: 0, fat: 12, budgetTier: "low" },
  { name: "Huevo", category: "protein", serving: "1 unidad", protein: 6, carbs: 0.4, fat: 5, budgetTier: "low" },
  { name: "Queso blanco duro", category: "protein", serving: "60 g", protein: 14, carbs: 1, fat: 11, budgetTier: "mid" },
  { name: "Pollo", category: "protein", serving: "100 g", protein: 27, carbs: 0, fat: 6, budgetTier: "mid" },

  // Carbohidratos
  { name: "Harina de maiz", category: "carb", serving: "50 g", protein: 3.5, carbs: 38, fat: 1.5, budgetTier: "low" },
  { name: "Yuca", category: "carb", serving: "150 g", protein: 2, carbs: 57, fat: 0.5, slowAbsorptionCarb: true, budgetTier: "low" },
  { name: "Fororo", category: "carb", serving: "50 g", protein: 5, carbs: 35, fat: 2, budgetTier: "low" },
  { name: "Arroz", category: "carb", serving: "150 g cocido", protein: 3, carbs: 43, fat: 0.4, budgetTier: "low" },
  { name: "Platano", category: "carb", serving: "1 unidad mediana", protein: 1.3, carbs: 31, fat: 0.4, budgetTier: "low" },
  { name: "Avena", category: "carb", serving: "40 g", protein: 5, carbs: 27, fat: 3, slowAbsorptionCarb: true, budgetTier: "low" },

  // Grasas
  { name: "Aguacate", category: "fat", serving: "100 g", protein: 2, carbs: 9, fat: 15, budgetTier: "mid" },
  { name: "Aceite vegetal", category: "fat", serving: "1 cucharada", protein: 0, carbs: 0, fat: 14, budgetTier: "low" },
];

function isEctoMesomorph(profile: BioAnalysisResult): boolean {
  return profile.biotipo === "ectomorph" || profile.biotipo === "mesomorph";
}

export function recommendEconomicSwaps(profile: BioAnalysisResult): FoodSwapRecommendation[] {
  const swaps: FoodSwapRecommendation[] = [
    {
      targetCategory: "protein",
      replace: "Pollo",
      with: "Sardina en lata",
      reason: "Reduce costo por gramo de proteina manteniendo alta densidad nutricional.",
    },
    {
      targetCategory: "protein",
      replace: "Queso blanco duro",
      with: "Huevo",
      reason: "Huevo suele ser mas economico y facilita ajustar porciones diarias.",
    },
    {
      targetCategory: "carb",
      replace: "Arroz",
      with: "Yuca",
      reason: "Yuca mantiene aporte energetico y puede ofrecer mejor saciedad por porcion.",
    },
    {
      targetCategory: "fat",
      replace: "Aguacate",
      with: "Aceite vegetal",
      reason: "Aceite vegetal permite cubrir grasas esenciales a menor costo inmediato.",
    },
  ];

  // Regla solicitada: Ecto-mesomorfo con femur largo -> carbs de absorcion lenta.
  if (isEctoMesomorph(profile) && profile.isLongFemur) {
    swaps.push({
      targetCategory: "carb",
      replace: "Harina de maiz",
      with: "Yuca + Avena",
      reason:
        "Perfil ecto-mesomorfo con femur largo: priorizar carbohidratos de absorcion lenta para sostener entrenamiento de pierna.",
    });
  }

  return swaps;
}

export function buildNutritionSuggestion(profile: BioAnalysisResult): NutritionPlanSuggestion {
  const slowCarbs = LOCAL_FOODS_VENEZUELA.filter(
    (food) => food.category === "carb" && food.slowAbsorptionCarb
  );
  const economicalSwaps = recommendEconomicSwaps(profile);
  const prioritizedFoods: LocalFood[] = [];
  const notes: string[] = [];

  if (isEctoMesomorph(profile) && profile.isLongFemur) {
    prioritizedFoods.push(...slowCarbs);
    notes.push("Prioridad alta de carbohidratos de absorcion lenta para rendimiento de pierna.");
  } else {
    prioritizedFoods.push(
      ...LOCAL_FOODS_VENEZUELA.filter((food) => food.budgetTier === "low").slice(0, 6)
    );
    notes.push("Plan base economico usando alimentos locales de alta disponibilidad.");
  }

  return {
    profile: `${profile.biotipo}${profile.isLongFemur ? " + femur largo" : ""}`,
    prioritizedFoods,
    economicalSwaps,
    notes,
  };
}
