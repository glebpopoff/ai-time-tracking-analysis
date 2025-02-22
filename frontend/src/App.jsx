import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const Response = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  white-space: pre-wrap;
`;

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: Failed to get response from the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Time Tracking Analysis</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question about time tracking data..."
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </Form>
      {response && <Response>{response}</Response>}
    </Container>
  );
}

export default App;
