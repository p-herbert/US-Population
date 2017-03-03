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

    return data.map((state) => {
      const geo = state[1].split(',');

      return {
        name: geo[0],
        pop: parseInt(state[0], 10),
        division: geo[2] || 'N/A',
        region: geo[3] || 'N/A' };
    });
  }

  function sortByPopulation(states) {
    return states.sort((stateA, stateB) => stateA.pop < stateB.pop);
  }

  function addRow(state) {
    $('#population > tbody')
      .append(`<tr><<td>${state.name}</td><td>${state.region}</td><<td>${state.division}</td><td>${state.pop}</td></tr>`);
  }

  function makeTable(states) {
    const total = {
      name: 'Total',
      pop: sumTotal(states),
      division: 'N/A',
      region: 'N/A' };

    states.forEach(state => addRow(state));

    addRow(total);
  }

  $.ajax({
    type: 'GET',
    url: url,
    success: data => makeTable(normalize(data)),
    error: error => console.log(error) });
});

