# Emerging Technologies - Group 4

## Description
This application allows nurses to record and monitor patients' vital signs. It includes a frontend interface for data entry, a backend that processes and stores the information, and a machine learning model that helps identify medical conditions based on the vital signs.

## Requirements

- Node.js (v14 or later)
- npm
- TensorFlow.js (using the GPU version)

## Installation Instructions

### Backend

1. Open a terminal and navigate to the `backend` directory.

   ```bash
   cd backend
   ````
2. Install the necessary dependencies.

   ```bash
   npm install
   ````
3. Copy the tensorflow.dll file from node_modules/@tensorflow/tfjs-node/deps/lib/tensorflow.dll to the node_modules/@tensorflow/tfjs-node-gpu/lib/napi-v8/ folder.

   ```bash
   cp node_modules/@tensorflow/tfjs-node/deps/lib/tensorflow.dll node_modules/@tensorflow/tfjs-node-gpu/lib/napi-v8/
   ````
4. Start the backend server.

   ```bash
   npm run dev
   ````
### Frontend

1. Open another terminal and navigate to the `frontend` directory.

   ```bash
   cd frontend
   ````

2. Install the necessary dependencies.

   ````bash
   npm install
   ````
4. Run the frontend application.

   ````bash
   npm run dev
   ````
## Thanks :)
