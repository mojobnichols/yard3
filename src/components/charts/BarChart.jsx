import React, {
  PropTypes
}                          from 'react';
import * as d3             from 'd3';
import {
  applyStyles2Selection,
  extractStyles,
  dynamicStyleTypes,
}                          from '../../utils/styles';


export default class BarChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, x, y, containerWidth, containerHeight, yScale, xScale } = this.props;
    const $chart = d3.select(this.$chart);

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);


    // const t = d3.transition()
    //   .duration(500)
    //   .ease(d3.easeLinear);

    const update = $chart.selectAll('.bar')
      .data(data);
    const enter = update.enter();
    const exit = update.exit();

    enter
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(x(d)))
      .attr('y', d => yScale(y(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', d => containerHeight - yScale(y(d)));

    update
      .attr('width', xScale.bandwidth())
      .attr('height', d => containerHeight - yScale(y(d)))
      .attr('x', d => xScale(x(d)))
      .attr('y', d => yScale(y(d)));

    // or
    // enter
    //   .append('rect')
    //   .attr('class', 'bar')
    // .merge(update)
    //   .attr('width', xScale.bandwidth())
    //   .attr('height', d => containerHeight - yScale(y(d)))
    //   .attr('x', d => xScale(x(d)))
    //   .attr('y', d => yScale(y(d)));

    applyStyles2Selection(extractStyles(this.props), $chart.selectAll('.bar'));

    exit
      .remove();
  }

  render() {
    const { containerHeight, containerWidth, children } = this.props;

    return (
      <g
        ref={el => this.$chart = el}
      >
        { React.Children.map(children, child => React.cloneElement(child, {containerWidth, containerHeight})) }
      </g>
    );
  }
}

BarChart.propTypes = {
  ...dynamicStyleTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number
};

BarChart.defaultProps = {
  x: d => d.key,
  y: d => d.value
};
