const request=require('request');

module.exports.getWeather=function(lat,lng,callback){
  request({
    url:`https://api.darksky.net/forecast/da4042315201081260c2b3203bbf6255/${lat},${lng}`,
    json:true
  },(error,response,body)=>{
     if(!error && response.statusCode===200){
       callback(undefined,{
         temp:body.currently.temperature,
         aprntemp:body.currently.apparentTemperature
     });
     }
      else{
        callback('Unable to fetch weather');}
      }
  );
};
