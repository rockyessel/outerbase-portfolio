// pages/_error.js
import React from 'react'

import Router from 'next/router';

class ErrorPage extends React.Component {
  // This method will be called whenever there is an error.
  static async getInitialProps({ res, err }) {
    // Check if there is an error with a network error code.
    if (err && err.code === 'ECONNREFUSED') {
      if (res) {
        // If this error occurs on the server, redirect on the server-side.
        res.writeHead(302, {
          Location: '/network-error',
        });
        res.end();
      } else {
        // If this error occurs on the client, redirect on the client-side.
        Router.replace('/network-error');
      }
    }

    // Return an empty object.
    return {};
  }

  render() {
    return (
      <div>
        <h1>Error</h1>
        <p>An error occurred.</p>
      </div>
    );
  }
}

export default ErrorPage;
