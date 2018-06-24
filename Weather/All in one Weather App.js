//This one can be used alone
const yargs=require('yargs');
const axios=require('axios');

var argv=yargs.options({
  a:{
    demand:true,
    alias:'address',
    describe:'Address to fetch weather for',
    string : true
  }
}).help().alias('help','h').argv;

var encdadrs=encodeURIComponent(argv.address);
var geocodeurl= `https://maps.googleapis.com/maps/api/geocode/json?address=${encdadrs}`;
axios.get(geocodeurl).then((response)=>{
  if(response.data.status==='ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }
  var lat=response.data.results[0].geometry.location.lat;
  var lng=response.data.results[0].geometry.location.lng;
  var weatherurl=`https://api.darksky.net/forecast/da4042315201081260c2b3203bbf6255/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherurl);
}).then((response)=>{
  var temp=response.data.currently.temperature;
  var apptemp=response.data.currently.apparentTemperature;
  console.log('TEMP: ',temp);
  console.log('It feels like: ',apptemp);
}).catch((e)=>{
 if(e.code==='ENOTFOUND'){
   console.log('Server Not Responding');
 } else{
   console.log(e.message);
 }
})
