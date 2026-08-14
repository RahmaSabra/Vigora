export type USDAFoodNutrient = {
  nutrientId: number;
  nutrientName: string;
  unitName: string;
  value: number;
};

export type USDAFood = {
  fdcId: number;
  description: string;
  dataType: string;
  brandOwner?: string;
  brandName?: string;
  servingSize?: number;
  servingSizeUnit?: string;
  householdServingFullText?: string;
  foodNutrients: USDAFoodNutrient[];
};

export type VigoraFood = {
  id: number;
  name: string;
  type: string;
  brandName?: string;
  servingSize?: number;
  servingUnit?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
};
