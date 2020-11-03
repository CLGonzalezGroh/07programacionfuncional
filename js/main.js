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
  `<${obj.tag}${obj.attrs ? " " : ""}${attrsToString(obj.attrs)}>${content}</${
    obj.tag
  }>`;

const tag = (t) => {
  if (typeof t === "string") {
    return tagAttrs({ tag: t });
  } else {
    return tagAttrs(t);
  }
};
const tableRowTag = tag("tr");
const tableRow = (items) => tableRowTag(tableCells(items));
//const tableRow = (items) => compose(tableRowTag, tableCells)(items);

const tableCell = tag("td");
console.log(tableCell);
const tableCells = (items) => items.map(tableCell).join("");
console.log(tableCells);

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
  updateTotals();
  renderItems();
  cleanInputs();
};

const updateTotals = () => {
  let calories = 0,
    carbs = 0,
    protein = 0;

  list.map((item) => {
    (calories += item.calories),
      (carbs += item.carbs),
      (protein += item.protein);
  });

  document.getElementById("totalCalories").textContent = calories;
  document.getElementById("totalCarbs").textContent = carbs;
  document.getElementById("totalProtein").textContent = protein;
};

const cleanInputs = () => {
  $description.value = "";
  $calories.value = "";
  $carbs.value = "";
  $protein.value = "";
};

const renderItems = () => {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  console.log(itemList);
  list.map((item) => {
    const row = tableRow([
      item.description,
      item.calories,
      item.carbs,
      item.protein,
    ]);

    itemList.appendChild(row);
    console.log(itemList);
  });
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
