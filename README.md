# Time Tracking Analysis App

This application allows you to analyze time tracking data using AI. You can ask questions about the data and get insights using natural language.

## Prerequisites

- Node.js (v18 or later)
- Ollama installed locally with the Mistral model
- npm or yarn

## Setup

1. Install Ollama and the Mistral model:
```bash
# Install Ollama (if not already installed)
curl https://ollama.ai/install.sh | sh

# Pull the Mistral model
ollama pull mistral
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter your question in the input field (e.g., "How many hours did John Mendes track in January?")
2. Click "Analyze" to get insights from the AI
3. The response will appear below the input field

## Data Structure

The application analyzes time tracking data with the following fields:
- ClientName
- ProjectId
- ProjectName
- ProjectStatus
- PhaseName
- DeliverableName
- MilestoneName
- SkillLevelName
- SkillName
- EstimateInHours
- FeeEstimateHigh
- TrackedTimeInHours
- TrackedFee
- TrackedLaborCost
- BillingRate
- LaborRate
- Comment
- TrackedDate
- FirstName
- LastName
- DepartmentId
- DepartmentName
- UserCategoryTag
