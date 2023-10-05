export const Legend = () => {
  console.log("Legend");
  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-icon start"></div>
        <p className="legend-text">Start Node</p>
      </div>
      <div className="legend-item">
        <div className="legend-icon target"></div>
        <p className="legend-text">Target Node</p>
      </div>
      <div className="legend-item">
        <div className="legend-icon visited"></div>
        <p className="legend-text">Visited Node</p>
      </div>
      <div className="legend-item">
        <div className="legend-icon shortest"></div>
        <p className="legend-text">Shortest Path</p>
      </div>
      <div className="legend-item">
        <div className="legend-icon wall"></div>
        <p className="legend-text">Walls</p>
      </div>
      <div className="legend-item">
        <div className="legend-icon weighted"></div>
        <p className="legend-text">Weighted Node</p>
      </div>
    </div>
  );
};
