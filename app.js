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

  function addRow(state) {
    $('#population > tbody')
      .append(`<tr><<td>${state.name}</td><td>${state.region}</td><<td>${state.division}</td><td>${state.pop}</td></tr>`);
  }

  function makeTable(states) {
    states.sort((stateA, stateB) => stateA.pop < stateB.pop);

    const total = {
      name: 'Total',
      pop: sumTotal(states),
      division: 'N/A',
      region: 'N/A' };

    addRow(total);
    states.forEach(state => addRow(state));
  }

  // Flip = -1 sort ascending
  // Flip = 1 sort descending
  let flip = -1;

  $.get(url)
    .then(data => normalize(data))
    .then(data => makeTable(data))
    .done((data) => {
      // Sort by population
      $('#population > thead').find('th').eq(3).on('click', (event) => {
        const rows = $('#population > tbody > tr:gt(0)').get();

        rows.sort((a, b) => flip * ($(b).find('td').eq(3).text() - $(a).find('td').eq(3).text()));

        $.each(rows, (idx, row) => $('#population > tbody').append(row));

        flip *= -1;
      });
    })
    .fail(error => console.log(error));
});

