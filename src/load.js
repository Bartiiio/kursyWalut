const load = async () => {
   const response = await fetch(
      "https://api.nbp.pl/api/exchangerates/tables/a/"
   );
   const valutes = await response.json();
   const [currvalutes] = valutes;
   const date = currvalutes.effectiveDate;

   return date;
};

export default load;
