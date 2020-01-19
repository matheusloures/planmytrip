
const colorutils= require('colorutils')
const colorxjs = require('colorxjs')

var request = require("request");
var dates = require('./dates.json')
var intervalo = interval(10000)
var intervalo2 = interval(10000*35)

var aeroportos = ["SXF","CGN", "FRA", "AGP", "SDR", "IBZ", "NAP", "MLA", "STN", "CRL","WMI","BUD","PRG","VNO","KBP","SOF"]
// 15 aeroportos
colorxjs.intervalo(intervalo2).subscribe(aeros=>{


    colorxjs.intervalo(intervalo).subscribe(tempo=>{
    var aeroporto = aeroportos[aeros];
    var data = dates[tempo];
    var options = { method: 'GET',
    url: 'https://desktopapps.ryanair.com/v4/pt-pt/availability',
    qs: 
     { ADT: '1',
       CHD: '0',  
       DateOut: data,
       Destination: 'BCN',
       FlexDaysOut: '0',
       INF: '0',
       IncludeConnectingFlights: 'true',
       Origin: aeroporto,
       RoundTrip: 'false',
       TEEN: '0',
       ToUs: 'AGREED',
       exists: 'false',
       promoCode: '' },
    headers: 
     { 'cache-control': 'no-cache' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var gotFare = [];
    var parsedBody = JSON.parse(body)
    gotFare.push(parsedBody)
    write.write(gotFare, './fares/tobcn_'+data+'_'+aeroporto+'.json')
  });
})

})

