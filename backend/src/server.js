const express = require('express');
const multer = require('multer');
const cors = require('cors');
const MainController = require('./controllers/MainController');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing ke MainController [cite: 86]
app.post('/api/process', upload.array('files'), MainController.handleRequest);

app.listen(3000, () => {
    console.log('Secure PDF System running on port 3000');
});