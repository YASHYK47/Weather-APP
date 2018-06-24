//NOTE-ALL THREE FILES(App.js,Geocode.js and Weather.js) MUST BE IN THE SAME FOLDER WHILE RUNNING THIS APP.JS FILE
const request=require("request");

module.exports.geocodeAddress=function(adrs,callback){
  var encdadrs=encodeURIComponent(adrs);
request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encdadrs}`,
  json:true
},(error,response,body)=>{
if(error){
  callback('Unable to connect to server');
}
else if(body.status==="ZERO_RESULTS"){
  callback('Unable to find that address');
} else if(body.status==='OK'){
callback(undefined,{
  address:body.results[0].formatted_address,
  latitude:body.results[0].geometry.location.lat,
  longitude:body.results[0].geometry.location.lng
});
}
});
};

//Secret Key---da4042315201081260c2b3203bbf6255
