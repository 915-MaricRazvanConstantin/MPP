const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {router} = require("./routes/router"); // Add this line
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/people', router)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
