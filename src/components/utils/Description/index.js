import React, { useState, useEffect } from 'react';

import { client } from '../../../App';
import Loader from '../Loader';

export default function Description(props) {
  const { algorithm } = props;
  const [textArr, setTextArr] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDescription() {
    setLoading(true);
    const response = await client.get("description", [["algorithm", algorithm]]);
    setTextArr(response);
    setLoading(false);
  }

  useEffect(() => {
    fetchDescription();
  }, []);
 

  return (
    <>
      {loading && <Loader />}
      {textArr.map((text, i) => {
        return (
          <p key={i}>{text}</p>
        );
      })}
    </>
  );
}