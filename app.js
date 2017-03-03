$(function() {
  const url = "https://api.census.gov/data/2015/pep/population?get=POP,GEONAME&for=state";

  $.ajax({
    type: 'GET',
    url: url,
    success: data => console.log(data),
    error: error => console.log(error) });
});

