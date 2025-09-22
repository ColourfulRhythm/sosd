// pages/_error.js
import React from 'react';

function Error({ statusCode, errorMessage }) {
  return (
    <div>
      {statusCode
        ? `An error ${statusCode} occurred on server: ${errorMessage}`
        : `An error occurred on client: ${errorMessage}`}
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const errorMessage = err ? err.message : 'An error occurred';
  return { statusCode, errorMessage };
};

export default Error;
