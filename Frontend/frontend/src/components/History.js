import React from "react";

const History = ({ items, onSelect, onClear, isClearing }) => {
  return (
    
    <div className="history-card">
      <div className="history-header">
        <h3>Recent Searches</h3>
        <button
          className="clear-history-button"
          onClick={onClear}
          disabled={!items.length || isClearing}
          type="button"
        >
          {isClearing ? "Clearing..." : "Clear"}
        </button>
      </div>

      {!items.length ? (
        <p className="history-empty">No searches yet.</p>
      ) : (
        <ul className="history-list">
          {items.slice(0, 8).map((item) => (
            <li key={item._id}>
              <button
                className="history-item"
                onClick={() => onSelect(item.city)}
                type="button"
              >
                <span>{item.city}</span>
                <small>{Math.round(item.temperature)}°C</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;