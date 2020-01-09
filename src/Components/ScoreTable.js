import React from 'react';
import PropTypes from 'prop-types';

const ScoreTable = ({ scores }) => {
  if (scores && scores.length) {
    return (
      <div className="score-table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Turns</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(({ name, score }, index) => (
              <tr key={`${name}_${score}`}>
                <td>{index + 1}</td>
                <td>{score}</td>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div />;
};

ScoreTable.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ScoreTable;
