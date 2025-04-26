import React from 'react';
import styled from 'styled-components';

const OutputContainer = styled.div`
  margin: 10px 0;
`;

const Output = ({ input, output }) => {
  return (
    <OutputContainer>
      <div>&gt; {input}</div>
      <div>{output}</div>
    </OutputContainer>
  );
};

export default Output;