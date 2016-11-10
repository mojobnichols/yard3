import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import {
  extractStyles,
  staticStyleTypes,
}                          from '../../utils/styles';


const LineChart = (props) => {
  const { containerWidth, containerHeight, xScale, yScale, children, x, y, data } = props;
  const styles = extractStyles(props);

  xScale.rangeRound([0, containerWidth]);
  yScale.rangeRound([containerHeight, 0]);


  const line = d3.line()
    .x(d => xScale(x(d)))
    .y(d => yScale(y(d)))(data);

  return (
    <g>
      <path
        {...styles}
        d={line}
        className='line'
      />
      { React.Children.map(children, child => React.cloneElement(child, {containerWidth, containerHeight})) }
    </g>
  );
};

LineChart.propTypes = {
  ...staticStyleTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number
};

LineChart.defaultProps = {
  x: d => d.key,
  y: d => d.value,
  fill: 'none'
};

export default LineChart;
