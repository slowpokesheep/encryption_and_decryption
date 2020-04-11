import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function NavImageBox(props) {
  const { backgroundUrl, text, link } = props;
  console.info(backgroundUrl)

  return (
    <Link
      to={link}
      className="image-box"  
    >
      <div
        className="image-box__container shadow"
        style={{background: `url("${backgroundUrl}") center / cover no-repeat`}}
      />
      <h2 className="image-box__title">{text}</h2>
    </Link>
  )
}