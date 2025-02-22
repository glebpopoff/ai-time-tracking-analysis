import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse';
import ollama from 'ollama';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Function to read and parse CSV data
async function readCSVData() {
  const fileContent = await fs.readFile('../data.csv', 'utf-8');
  return new Promise((resolve, reject) => {
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// Simple text similarity function
function calculateSimilarity(text1, text2) {
  const words1 = text1.toLowerCase().split(/\W+/);
  const words2 = text2.toLowerCase().split(/\W+/);
  const intersection = words1.filter(word => words2.includes(word));
  return intersection.length / Math.sqrt(words1.length * words2.length);
}

// Function to convert a record to searchable text
function recordToText(record) {
  return Object.entries(record)
    .map(([key, value]) => `${key}: ${value}`)
    .join(' | ');
}

// Cache for processed data
let dataCache = null;

// Function to prepare and cache data
async function prepareData() {
  if (dataCache) return dataCache;

  const data = await readCSVData();
  dataCache = data.map(record => ({
    ...record,
    searchText: recordToText(record)
  }));
  return dataCache;
}

app.post('/analyze', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Processing query:', prompt);
    const data = await prepareData();
    
    // Find relevant records using text similarity
    const dataWithScores = data.map(record => ({
      ...record,
      relevanceScore: calculateSimilarity(prompt, record.searchText)
    }));

    // Sort by relevance and get top records
    const topRecords = dataWithScores
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 50) // Get top 50 most relevant records
      .map(({ searchText, relevanceScore, ...record }) => record);

    console.log(`Found ${topRecords.length} relevant records`);

    // Create context for the AI
    const context = `You are analyzing time tracking data. Here are the most relevant entries for the question:
    
    Data Structure:
    ${Object.keys(data[0]).filter(key => !['searchText', 'relevanceScore'].includes(key)).join(', ')}
    
    Question: ${prompt}
    
    Here are the ${topRecords.length} most relevant entries:
    ${JSON.stringify(topRecords, null, 2)}
    
    Please analyze this data and provide detailed insights based on the question.
    Focus on patterns, trends, and specific details from the data that are most relevant to the question.
    If the question asks about specific metrics, please calculate them from the data provided.`;

    console.log('Sending request to Ollama...');
    const response = await ollama.chat({
      model: 'mistral',
      messages: [
        {
          role: 'system',
          content: 'You are a data analysis expert specializing in time tracking analysis. Provide clear, specific insights based on the data provided.'
        },
        {
          role: 'user',
          content: context
        }
      ]
    });

    console.log('Received response from Ollama');
    res.json({ response: response.message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze data',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
