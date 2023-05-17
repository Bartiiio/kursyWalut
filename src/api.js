const api = async (data) => {
   const tab = ["a", "b"];
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

   valuesArr.forEach((element) => {
      if (element.code == `${data}`) {
         value = element;
      }
   });
   return { value: value, valuesArr: valuesArr };
};
export default api;
