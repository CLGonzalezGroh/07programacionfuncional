const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);

const $description = document.getElementById("description");
const $calories = document.getElementById("calories");
const $carbs = document.getElementById("carbs");
const $protein = document.getElementById("protein");

const validateInputs = () => {
  $description.value ? "" : $description.classList.add("is-invalid");
  $calories.value ? "" : $calories.classList.add("is-invalid");
  $carbs.value ? "" : $carbs.classList.add("is-invalid");
  $protein.value ? "" : $protein.classList.add("is-invalid");

  if ($description.value && $calories.value && $carbs.value && $protein.value) {
    console.log("OK");
  }
};

$description.addEventListener("keydown", () =>
  $description.classList.remove("is-invalid")
);

$calories.addEventListener("keydown", () =>
  $calories.classList.remove("is-invalid")
);

$carbs.addEventListener("keydown", () => $carbs.classList.remove("is-invalid"));

$protein.addEventListener("keydown", () =>
  $protein.classList.remove("is-invalid")
);
