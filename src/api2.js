const api = async (data) => {
   const tab = ["a"];
   let valuesArr = [];
   let value1;
   let value2;

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

   const [newValuesArr] = valuesArr;
   const objectValues = Object.values(newValuesArr.rates);

   objectValues.forEach((element) => {
      if (element.code == `${data}`) {
         value2 = element;
      }
   });
   console.log(value2);
   return value2;
};
export default api;
