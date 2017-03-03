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

  $.ajax({
    type: 'GET',
    url: url,
    success: data => console.log(data),
    error: error => console.log(error) });
});

