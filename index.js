const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


// POST method to process data
app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const lowerAlphabets = alphabets.filter(ch => /^[a-z]$/.test(ch));
    const highestLowercase = lowerAlphabets.length > 0 ? [lowerAlphabets.sort().pop()] : [];

    const response = {
        "is_success": true,
        "user_id": "john_doe_17091999",  // Replace with dynamic values
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercase
    };

    res.json(response);
});

// GET method to return operation code
app.get('/bfhl', (req, res) => {
    res.json({ "operation_code": 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
