//NOTE-ALL THREE FILES(App.js,Geocode.js and Weather.js) MUST BE IN THE SAME FOLDER WHILE RUNNING THIS APP.JS FILE
const request=require('request');

module.exports.getWeather=function(lat,lng,callback){
  request({
    url:`https://api.darksky.net/forecast/da4042315201081260c2b3203bbf6255/${lat},${lng}`,//This was API key is valid for one day only
    json:true
  },(error,response,body)=>{
     if(!error && response.statusCode===200){
       callback(undefined,{                                         //Passing both temperatures as object
         temp:body.currently.temperature,
         aprntemp:body.currently.apparentTemperature
     });
     }
      else{
        callback('Unable to fetch weather details');}
      }
  );
};
