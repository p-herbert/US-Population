$(function() {

                jQuery.support.cors = true;
        stuff = ["01", "02", "04", "05", "06", "08", "09", "10", "11", "12", "13", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "44", "45", "46", "47", "48", "49", "50", "51", "53", "54", "55", "56", "72"];
        results = []
        total = 0
for (x=0;x <=stuff.length - 1;x++) {
  var url ="https://api.census.gov/data/2015/pep/population?get=POP,GEONAME&for=state:" + stuff[x];
  console.log('debug: ' + url);
$.ajax({
           type: 'GET',
             url:url,
             async: 0,
           success: function(r) {
           results.push(r[1]);
             total = total+ parseInt(r[1][0])
             // document.write(total);
           }
           })
}
m = 1;
  state ='';
for (x in results) {
if (new Number(results[x][0]) > m) (state = results[x][1]) && (m = parseInt(results[x][0]));
}
});