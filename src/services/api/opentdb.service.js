import { getJson } from "./httpClient.js";

export function fetchCategories() {
  return getJson("https://opentdb.com/api_category.php");
}

export function fetchQuestions({ amount, category, difficulty }) {
  const params = new URLSearchParams();
  params.set("amount", String(amount || 10));
  params.set("type", "multiple");
  if (difficulty) params.set("difficulty", difficulty);
  if (category) params.set("category", category);
  return getJson(`https://opentdb.com/api.php?${params.toString()}`);
}
