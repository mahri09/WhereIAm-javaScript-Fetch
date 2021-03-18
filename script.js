const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const latitudeInput = document.querySelector("#latitude");
const longitudeInput = document.querySelector("#longitude");


const whereAmI = (latitude,longitude)=>{
  const apiKey = "d7bb7fa0-8756-11eb-82f1-cd5bd1c397df"; 
  const url = "https://app.geocodeapi.io/api/v1/reverse?apikey=";
  // const coordinates = `&point.lat=${latitude}&point.lon=${longitude}`;
  const coordinates = `&point.lat=${latitude}&point.lon=${longitude}`;
  fetch(url + apiKey + coordinates)
  .then((response)=>{
    if(response.ok){
      return response.json()
    } throw new Error(`Problem with getting data; the code: ${response.status}`)
  })
  .then((data)=>{
    console.log(data.features[0].properties)
    const city = data.features[0].properties.locality;
    const country = data.features[0].properties.country
    console.log(`You are in ${city} , country of ${country}`)
    return fetch(`https://restcountries.eu/rest/v2/name/${country}`);
  })
  .then((res)=>{
    if(res.ok){
      return res.json()
    } throw new Error(`Problem with getting data; the code: ${res.status}`)
  })
  .then((countryData)=>{
    console.log(countryData[0])
    renderCountry(countryData[0], 'country')
  })
  .catch(error=>{
    console.error(error);
  })


}
// whereAmI()

btn.addEventListener('click', displayCountry)