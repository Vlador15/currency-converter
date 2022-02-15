let currency = document.querySelector(".js-input-currency");
let inputData = document.querySelector(".js-input-value");
let resultValue = document.querySelector(".js-result-value");
let resultText = document.querySelector(".js-result-text");
let cursTable = document.querySelector(".js-curs-table");
let curs = 0;

async function getCurs() {
  let data = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  let json = await data.json();
  return json;
}

currency.addEventListener("change", (e) => {
  let indexSelected = currency.selectedIndex,
    option = currency.querySelectorAll("option")[indexSelected];
  editData(option.value);
});

inputData.addEventListener("input", (e) => {
  resultValue.value = (Number(inputData.value) * curs).toFixed(2);
});

async function editData(value) {
  let valute = await getCurs();
  let newCurs = valute.Valute[value].Value;
  curs = newCurs;
  resultText.innerHTML = valute.Valute[value].Name;

  inputData.value = 1;
  resultValue.value = newCurs;
}

const createTable = async () => {
  let data = await getCurs();
  let valutes = data.Valute;

  const result = Object.keys(valutes).map((value, index) =>
    Object.values(valutes[value])
  );

  result.forEach((item) => {
    let ids = [2, 4, 6];
    let tr = document.createElement("tr");
    ids.forEach((id) => {
      tr.innerHTML += `<td>${item[id]}</td>`;
    });
    document.querySelector(".js-curs-table tbody").append(tr);
  });
};

const editCurrency = async () => {
  let valute = await getCurs();
  let valutes = valute.Valute;

  const result = Object.keys(valutes).map((value, index) =>
    Object.values(valutes[value])
  );

  result.forEach((item) => {
    let option = document.createElement("option");
    option.value = item[2];
    option.innerHTML = item[4];
    currency.append(option);
  });
};

function start() {
  createTable();
  editCurrency();
}

start();

const options = {
  method: "GET",
  url: "https://www.cbr-xml-daily.ru/daily_json.js",
};

async function getUSDValue(el) {
  let response = await axios.request(options);
  if (response.status === 200) return response.data.Valute[el].Value;
  else {
    console.log("Error");
  }
}

getUSDValue("USD").then((res) => {
  console.log(res);
});
