import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CommandLine from './CommandLine';
import Output from './Output';
import { About } from '../pages/About';
import { Projects } from '../pages/Projects';
import { Contact } from '../pages/Contact';
import { Help } from '../pages/Help';

const TerminalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: #000;
  color: #0f0;
  overflow-y: auto;
  font-size: 16px;
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const [welcomeText, setWelcomeText] = useState('');
  const fullWelcomeText = "Welcome to My Portfolio Terminal. Type 'help' for commands.";
  const errorMessages = [
    "Command not found. Did you type that with your elbows?",
    "Oops, that’s not a command. Try 'help' for a lifeline!",
    "404: Command not found in this dimension.",
  ];

useEffect(() => {
  let i = 0;
  const typing = setInterval(() => {
    if (i < fullWelcomeText.length) {
      setWelcomeText(fullWelcomeText.slice(0, i + 1));
      i++;
    } else {
      clearInterval(typing);
    }
  }, 50);
  return () => clearInterval(typing);
}, []);


  const commands = {
    help: <Help />,
    about: <About />,
    projects: <Projects />,
    contact: <Contact />,
    clear: () => setHistory([]),
  };
  
  const handleCommand = (command) => {
    command = command.trim().toLowerCase();
    if (command in commands) {
      if (typeof commands[command] === 'function') {
        commands[command]();
      } else {
        setHistory([...history, { input: command, output: commands[command] }]);
      }
    } else {
      setHistory([
        ...history,
        { input: command, output: `Command not found: ${command}. Type 'help' for available commands.` },
      ]);
    }

    if (command in commands) {
        // ...handle command
      } else {
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        setHistory([...history, { input: command, output: randomError }]);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  return (
    <TerminalContainer ref={terminalRef}>
      <div>{welcomeText}</div>
      {history.map((item, index) => (
        <div key={index}>
          <Output input={item.input} output={item.output} />
        </div>
      ))}
      <CommandLine input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </TerminalContainer>
  );
};

export default Terminal;