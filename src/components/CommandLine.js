import React from 'react';
import styled from 'styled-components';

const Prompt = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Input = styled.input`
  background: none;
  border: none;
  color: #0f0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  outline: none;
  flex: 1;
  caret-color: #0f0;
  &::after {
    content: '_';
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const PromptSpan = styled.span`
  color: #00ff00;
  animation: pulse 2s infinite;
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;

const CommandLine = ({ input, setInput, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Prompt>
      <PromptSpan>retro.dev@portfolio:~$&gt;</PromptSpan>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </Prompt>
    </form>
  );
};

export default CommandLine;