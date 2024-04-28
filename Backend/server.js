const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module

const app = express();
const PORT = 3001;

let totalCount = 0;
app.use(cors());
app.use(bodyParser.json());

// API to add data
app.post('/api/add', (req, res) => {
  const { component1, component2, component3 } = req.body;
  
  // Your logic to handle adding data goes here
  
  if (component1 || component2 || component3) {
    totalCount++;
    res.json({ totalCount });
  } else {
    res.status(400).send('No data provided');
  }
});

// API to update data
app.post('/api/update', (req, res) => {
  const { component1, component2, component3 } = req.body;
  
  // Your logic to handle updating data goes here
  
  if (component1 || component2 || component3) {
    totalCount++;
    res.json({ totalCount });
  } else {
    res.status(400).send('No data provided');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
