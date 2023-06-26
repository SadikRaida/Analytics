const express = require('express');
const cors = require('cors');
const tracker = require('./middlewares/tracker');

const app = express();

app.use(cors());

app.use(
    tracker({
        API_KEY: 'YOUR_API_KEY',
        service: 'Backend',
    })
);

app.use((req, res, next) => {
    req.sendEvent({});
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
