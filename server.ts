import express from "express";
import cors from "cors";
import "dotenv/config";
import type { USDAFoodNutrient, USDAFood, VigoraFood } from "./types/food";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

async function fetchFoodData(key: string, food: string) {
  const response = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${food}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  const foods: VigoraFood[] = data.foods.map((food: USDAFood) => {
    const calories = food.foodNutrients.find(
      (nutrient: USDAFoodNutrient) => nutrient.nutrientId === 1008,
    );
    const protein = food.foodNutrients.find(
      (nutrient: USDAFoodNutrient) => nutrient.nutrientId === 1003,
    );

    const fat = food.foodNutrients.find(
      (nutrient: USDAFoodNutrient) => nutrient.nutrientId === 1004,
    );

    const carbs = food.foodNutrients.find(
      (nutrient: USDAFoodNutrient) => nutrient.nutrientId === 1005,
    );

    return {
      id: food.fdcId,
      name: food.description,
      type: food.dataType,
      brandName: food.brandName,
      servingSize: food.servingSize,
      servingSizeUnit: food.servingSizeUnit,
      householdServingFullText: food.householdServingFullText,
      calories: calories?.value,
      protein: protein?.value,
      fat: fat?.value,
      carbs: carbs?.value,
    };
  });

  return foods;
}

app.get("/api/foods/search", async (req, res) => {
  const key = process.env.API_KEY;
  const food = req.query.q;

  if (!key) {
    return res.status(500).json({ message: "no api key provided" });
  }

  if (typeof food !== "string") {
    return res.status(400).json({ message: "please enter a valid food" });
  }

  try {
    const foodData = await fetchFoodData(key, food);
    res.json(foodData);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "failed to fetch food data" });
  }
});

app.listen(PORT, () => {
  console.log(`Vigora API running on http://localhost:${PORT}`);
});
