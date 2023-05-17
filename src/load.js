const load = async () => {
   const response = await fetch(
      "https://api.nbp.pl/api/exchangerates/tables/a/"
   );
   const valut = await response.json();
   const [currvalutes] = valut;
   const date = currvalutes.effectiveDate;
   ////////////////////////////////////////////////

   const tab = ["b", "a"];
   let valuesArr = [];
   let value;

   const tabmap = tab.map(async (element) => {
      return await fetch(
         `https://api.nbp.pl/api/exchangerates/tables/${element}/`
      );
   });

   const valutes = await Promise.all(tabmap);

   for (const element of valutes) {
      const [currvalutes] = await element.json();
      valuesArr.push(currvalutes);
   }
   const kuke = Object.values(valuesArr[1]);
   const kuke2 = Object.values(kuke[3]);
   valuesArr.push(...kuke2);

   const [newValuesArr] = valuesArr;
   const objectValues = Object.values(newValuesArr.rates);
   valuesArr.push(...objectValues);

   valuesArr.splice(0, 2);

   return { date: date, valuesArr: valuesArr };
};

export default load;
