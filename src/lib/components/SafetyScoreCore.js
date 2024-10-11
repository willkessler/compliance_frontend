import * as d3 from 'd3';

export function createChart(data, containerWidth, containerHeight) {
  // Set up dimensions
  const margin = { top: 30, right: 10, bottom: 50, left: 10 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  // Parse dates
  const parseDate = d3.timeParse('%Y-%m-%d');
  data = data.map(d => ({...d, date: parseDate(d.date)}));

  // Set up scales
  const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .range([height, 0]);

  // Create SVG
  const svg = d3.create('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Set domains
  x.domain(data.map(d => d.date));
  y.domain([0, 2]);  // Fixed domain from 0 to 2

  // Create bars
  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.date))
    .attr('width', x.bandwidth())
    .attr('y', 0)
    .attr('height', height)
    .attr('fill', d => {
      if (d.score === 0) return 'red';
      if (d.score === 1) return 'yellow';
      return 'green';
    });

  // Add x-axis
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x)
      .tickFormat(d => d3.timeFormat('%b %d')(d))
    )
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .style('text-anchor', 'end')
    .style('font-size', '10px');

 // Add labels inside bars
  g.selectAll('.label')
    .data(data)
    .enter().append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.date) + x.bandwidth() / 2)
    .attr('y', height - 10)  // Position 10 pixels above the bottom
    .attr('dy', '.35em')
    .attr('text-anchor', 'start')  // Changed to 'end' to align text with the bottom of the bar
    .attr('transform', d => `rotate(-90 ${x(d.date) + x.bandwidth() / 2}, ${height - 10})`)
    .text(d => {
      if (d.score === 0) return 'Unacceptable';
      if (d.score === 1) return 'Conditional';
      return 'Acceptable';
    })
    .style('font-size', '16px')
    .style('fill', d => {
      if (d.score === 0) return 'white';
      if (d.score === 1) return 'black';
      return 'white';
    });

  return svg.node();
}
