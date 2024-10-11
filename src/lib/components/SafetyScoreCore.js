import * as d3 from 'd3';

export function createChart(data, containerWidth, containerHeight) {
  // Set up dimensions
  const margin = { top: 30, right: 20, bottom: 75, left: 20 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  // Parse dates
  const parseDate = d3.timeParse('%Y-%m-%d');
  data = data.map(d => ({...d, date: parseDate(d.date)}));

  // Set up scales
  const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

  // Set domains
  x.domain(data.map(d => d.date));

  // Create SVG
  const svg = d3.create('svg')
    .attr('width', containerWidth)
    .attr('height', containerHeight);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Define pill dimensions
  const pillWidth = x.bandwidth();
  const pillHeight = height * .9; // 80% of the chart height
  const pillRadius = Math.min(pillWidth / 2, 30); // Cap the radius at 10px

  // Create tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background-color', 'white')
    .style('border', '1px solid #ddd')
    .style('padding', '10px')
    .style('border-radius', '5px')
    .style('pointer-events', 'none');

  // Create pills
  g.selectAll('.pill')
    .data(data)
    .enter().append('path')
    .attr('class', 'pill')
    .attr('d', d => {
      const xPos = x(d.date);
      const yPos = (height - pillHeight) / 2;
      return `
        M ${xPos + pillRadius},${yPos}
        H ${xPos + pillWidth - pillRadius}
        A ${pillRadius},${pillRadius} 0 0,1 ${xPos + pillWidth},${yPos + pillRadius}
        V ${yPos + pillHeight - pillRadius}
        A ${pillRadius},${pillRadius} 0 0,1 ${xPos + pillWidth - pillRadius},${yPos + pillHeight}
        H ${xPos + pillRadius}
        A ${pillRadius},${pillRadius} 0 0,1 ${xPos},${yPos + pillHeight - pillRadius}
        V ${yPos + pillRadius}
        A ${pillRadius},${pillRadius} 0 0,1 ${xPos + pillRadius},${yPos}
        Z
      `;
    })
    .attr('fill', d => {
      if (d.score === 0) return 'red';
      if (d.score === 1) return 'yellow';
      return 'green';
    })
    .style('cursor', 'pointer')
    .on('mouseover', (event, d) => {
      let label;
      if (d.score === 0) label = 'Unsatisfactory';
      else if (d.score === 1) label = 'Conditional';
      else label = 'Satisfactory';
      
      tooltip.transition()
        .duration(200)
        .style('opacity', .9);
      tooltip.html(`${d3.timeFormat('%B %d, %Y')(d.date)}: <br/><b>${label}</b>`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    })
    .on('mouseout', () => {
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
    });

  // Add x-axis with tick marks
  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x)
      .tickFormat(d => d3.timeFormat('%b %d')(d))
      .tickSize(5)  // Short tick marks
    )
    .call(g => {
      g.select(".domain").attr("stroke", "black");  // Make axis line dark
      g.selectAll(".tick line")
        .attr("stroke", "black");  // Make tick marks dark
      g.selectAll(".tick text")
        .attr('transform', 'rotate(-45)')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .style('text-anchor', 'end')
        .style('font-size', '12px');
    });

  // Add legend
  const legendData = [
    { color: 'red', label: 'Unacceptable' },
    { color: 'yellow', label: 'Conditional' },
    { color: 'green', label: 'Acceptable' }
  ];

  const legend = g.append('g')
    .attr('transform', `translate(${width / 2},${height + 50})`);

  const legendItem = legend.selectAll('.legend-item')
    .data(legendData)
    .enter().append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(${i * 120 - 180}, 0)`);

  legendItem.append('circle')
    .attr('r', 6)
    .attr('fill', d => d.color);

  legendItem.append('text')
    .attr('x', 10)
    .attr('y', 4)
    .text(d => d.label)
    .style('font-size', '12px')
    .attr('alignment-baseline', 'middle');

  return svg.node();
}
