$(function() {
  const url = "https://api.census.gov/data/2015/pep/population?get=POP,GEONAME&for=state";

  function sumTotal(states) {
    let total = 0;

    states.forEach(state => (total += parseInt(state[0], 10)));

    return total;
  }

  $.ajax({
    type: 'GET',
    url: url,
    success: data => console.log(data),
    error: error => console.log(error) });
});

