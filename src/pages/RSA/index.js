import React from 'react';

import Base from '../../components/core/Base';
import Description from '../../components/utils/Description';

import KeyPairForm from '../../components/algorithms/Key/pair_form';

export default function RSAPage() {
  return (
    <Base>
      <Description algorithm="rsa" />
      <KeyPairForm />
    </Base>
  );
}