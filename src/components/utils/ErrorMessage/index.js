import React from 'react';

export default function ErrorMessage(props) {
  const { message } = props;

  return (
    <div className="w-100 py-2">
      <p className="text-danger">{message}</p>
    </div>
  )
}