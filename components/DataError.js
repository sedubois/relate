import React from 'react';

const DataError = ({ message }) => <div>{`Error: ${message}`}</div>;

DataError.propTypes = {
  message: React.PropTypes.string,
};

export default DataError;
