import React from 'react';

import './styles.scss';

export default function Loader(props) {
  return (
    <div className="loader__bg">
      <div className="loader__spinner__container">
        <div className="spinner-border text-primary loader__spinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}