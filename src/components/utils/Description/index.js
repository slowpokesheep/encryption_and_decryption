import React, { useState, useEffect } from 'react';

import { client } from '../../../App';
import Loader from '../Loader';

import './styles.scss';

export default function Description(props) {
  const { subject } = props;
  const [textArr, setTextArr] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDescription() {
    setLoading(true);
    const response = await client.get("description", [["subject", subject]]);
    setTextArr(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchDescription();
  }, []);

  return (
    <div className="description-block">
      {loading && <Loader />}
      {textArr.map((text, i) => {
        return (
          <p key={i}>{text}</p>
        );
      })}
    </div>
  );
}