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

  function sortByColumn(colNumber) {
    // Flip = -1 sort ascending
    // Flip = 1 sort descending
    let flip = -1;

      return $('#population > thead').find('th').eq(colNumber).on('click', (event) => {
        const rows = $('#population > tbody > tr:gt(0)').get();

        rows.sort((a, b) => {
          let aValue = $(a).find('td').eq(colNumber).text();
          let bValue = $(b).find('td').eq(colNumber).text();

          // If string is an interger then convert
          aValue = !isNaN(aValue) ? parseInt(aValue, 10) : aValue;
          bValue = !isNaN(bValue) ? parseInt(bValue, 10) : bValue;

          if (bValue < aValue) {
            return flip * -1;
          }

          if (bValue > aValue) {
            return flip * 1;
          }

          return 0;
        });

        $.each(rows, (idx, row) => $('#population > tbody').append(row));

        flip *= -1;
      });
  }

  $.get(url)
    .then(data => normalize(data))
    .then(data => makeTable(data))
    .done((data) => {
      // Sort by state
      sortByColumn(0);

      // Sort by region
      sortByColumn(1);

      // Sort by division
      sortByColumn(2);

      // Sort by population
      sortByColumn(3);
    })
    .fail(error => console.log(error));
});

