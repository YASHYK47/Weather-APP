//NOTE-ALL THREE FILES MUST BE IN THE SAME FOLDER WHILE RUNNING THIS APP.JS FILE
const yargs=require('yargs');             //To access the values entered in command line
const geocode=require('./geocode.js');    //To get the latitude and longitude of given address
const weather=require('./weather.js');    //To get Temperature using that latotude and longitude

var argv=yargs.options({
  a:{
    alias:'address',
    demand:true,
    describe:'Address to fetch weather for',
    string : true
  }
}).help().alias('help','h').argv;

geocode.geocodeAddress(argv.a,(errorMessage,results)=>{
if(errorMessage){console.log(errorMessage);
} else{
  console.log(results.address);
  console.log(`Latitude-${results.latitude} , Longitude-${results.longitude}`);       //Fetching lat and lng
  weather.getWeather(results.latitude,results.longitude,(errorMessage,wresults)=>{    //Passing lat and lng to Weather File
    if(errorMessage){console.log(errorMessage);
    } else{console.log(`Actually-${wresults.temp}F,It feels like-${wresults.aprntemp}F`);
   }
  });
}
});
