$(function() {
  const url = "https://api.census.gov/data/2015/pep/population?get=POP,GEONAME&for=state";

  function sumTotal(states) {
    let total = 0;

    states.forEach(state => (total += state.pop));

    return total;
  }

  function normalize(data) {
    // Remove header
    data.shift();

    function tag(strings, local, region, country) {
      return local === undefined ? 'Territory, United States' : `${local}, ${region}, ${country}`;
    }

    return data.map((state) => {
      const geo = state[1].split(',');

      return {
        state: geo[0],
        pop: parseInt(state[0], 10),
        geo: tag`${geo[2]}${geo[3]}${geo[4]}` };
    });
  }

  function sortByPopulation(states) {
    return states.sort((stateA, stateB) => stateA.pop < stateB.pop);
  }

  function makeTable(states) {
    const largest = sortByPopulation(states)[0];

    $('#population').append(`<tr><th>Total</th><td>${sumTotal(states)}</td></tr>`);
    $('#population').append(`<tr><th>Max</th><td>${largest.state}, ${largest.geo}</td></tr>`);
  }

  $.ajax({
    type: 'GET',
    url: url,
    success: data => makeTable(normalize(data)),
    error: error => console.log(error) });
});

