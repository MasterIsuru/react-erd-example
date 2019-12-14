import React from 'react';

export class Demos extends React.Component {
  render() {
    return (
      <div className="demo-div">
        <div>
          <h2>React JS ERD</h2>
          <span>
            <a onClick={() => window.location.assign('/demos/demo4')}>Click here</a> to go to ERD Page
          </span>
        </div>
      </div>
    );
  }
}
