const country1Select = document.getElementById("country1-select");
const country2Select = document.getElementById("country2-select");
const inputNumber = document.getElementById("input-number");
const spinner = document.getElementById("spinner");
const output = document.querySelector(".output");
const outputDate = document.querySelector(".outputDate");
let value1;
let value2;
let inputvalue = 1;
import load from "./load.js";
import api from "./api.js";

const selectedCountry = async () => {
   const value = country1Select.value;
   const apis = await api(value);
   value1 = apis;
};

const selectedCountry1 = async () => {
   const value = country2Select.value;
   const apis = await api(value);
   value2 = apis;
};

const calc = function (value1, value2, inputvalue) {
   if (value1 && value2 === undefined) {
      const calced = inputvalue * value1.mid;
      output.innerHTML = `${inputvalue} ${value1.code} to ${calced.toFixed(
         2
      )} PLN`;
   } else if (value1 === undefined && value2 === undefined) {
      const calced = inputvalue;
      output.innerHTML = `${inputvalue} PLN to ${inputvalue} PLN`;
   } else if (!value1) {
      const calced = inputvalue / value2.mid;
      output.innerHTML = `${inputvalue} PLN to ${calced.toFixed(2)} ${
         value2.code
      }`;
   } else {
      const calced = (inputvalue * value1.mid) / value2.mid;
      output.innerHTML = `${inputvalue} ${value1.code} to ${calced.toFixed(
         2
      )} ${value2.code}`;
   }
};

country1Select.addEventListener("change", async () => {
   await selectedCountry();
   calc(value1, value2, inputvalue);
});
country2Select.addEventListener("change", async () => {
   await selectedCountry1();
   calc(value1, value2, inputvalue);
});
inputNumber.addEventListener("input", () => {
   inputvalue = inputNumber.value;
   calc(value1, value2, inputvalue);
});

window.addEventListener("load", async () => {
   const data = await load();
   spinner.style.display = "none";
   outputDate.style.display = "block";
   outputDate.innerHTML = `Kursy z dnia: ${data} z NBP`;
});
