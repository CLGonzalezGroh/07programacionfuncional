const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);

const $description = document.getElementById("description");
const $calories = document.getElementById("calories");
const $carbs = document.getElementById("carbs");
const $protein = document.getElementById("protein");

const list = [];

const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj);
  const attrs = [];

  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i];
    attrs.push(`${attr}=${obj[attr]}`);
  }

  const string = attrs.join(" ");
  return string;
};

const tagAttrs = (obj) => (content = "") =>
  `<${obj.tag}${obj.attrs ? " " : ""}${attrsToString(obj.attrs)}>${content}<${
    obj.tag
  }>`;

const tag = (t) => {
  if (typeof t === "string") {
    return tagAttrs({ tag: t });
  } else {
    return tagAttrs(t);
  }
};

const validateInputs = () => {
  $description.value ? "" : $description.classList.add("is-invalid");
  $calories.value ? "" : $calories.classList.add("is-invalid");
  $carbs.value ? "" : $carbs.classList.add("is-invalid");
  $protein.value ? "" : $protein.classList.add("is-invalid");

  if ($description.value && $calories.value && $carbs.value && $protein.value) {
    add();
  }
};

const add = () => {
  const newItem = {
    description: $description.value,
    calories: parseInt($calories.value),
    carbs: parseInt($carbs.value),
    protein: parseInt($protein.value),
  };
  list.push(newItem);
  console.log(list);
  cleanInputs();
};

const cleanInputs = () => {
  $description.value = "";
  $calories.value = "";
  $carbs.value = "";
  $protein.value = "";
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
