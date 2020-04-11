import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../Header';
import Footer from '../Footer';

import './styles.scss';

export default function Base(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <Container id="maincontent">{children}</Container>
      <Footer />
    </>
  );
}