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
  return (
    <div className="legend">
      {data.map((subArray, index) => {
        return (
          <div className="legend-item" key={index}>
            <div className={subArray[0]}></div>
            <p className="legend-text">{subArray[1]}</p>
          </div>
        );
      })}
    </div>
  );
};

Legend.propTypes = {
  data: PropTypes.array,
};
