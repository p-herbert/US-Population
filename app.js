$(function() {
  const url = "https://api.census.gov/data/2015/pep/population?get=POP,GEONAME&for=state";

        results = []
        total = 0
  $.ajax({
    type: 'GET',
    url: url,
    success: data => console.log(data),
    error: error => console.log(error) });

m = 1;
  state ='';
for (x in results) {
if (new Number(results[x][0]) > m) (state = results[x][1]) && (m = parseInt(results[x][0]));
}
});
