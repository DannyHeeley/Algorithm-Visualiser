import PropTypes from "prop-types";

const legendData = [
  ["legend-icon start", "Start Node"],
  ["legend-icon target", "Target Node"],
  ["legend-icon visited", "Visited Node"],
  ["legend-icon shortest", "Shortest Path"],
  ["legend-icon wall", "Walls"],
  ["legend-icon weighted", "Weighted Node"],
];

export const Legend = ({ data = legendData }) => {
  const LegendItem = ({ className, text }) => {
    return (
      <div className="legend-item">
        <div className={className}></div>
        <p className="legend-text">{text}</p>
      </div>
    );
  };
  LegendItem.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
  };
  return (
    <div className="legend">
      {data.map((subArray, index) => {
        return (
          <LegendItem
            className={subArray[0]}
            text={subArray[1]}
            key={index}
          ></LegendItem>
        );
      })}
    </div>
  );
};
Legend.propTypes = {
  data: PropTypes.array,
};
