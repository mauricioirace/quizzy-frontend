import express from 'express';
import morgan from 'morgan';
import path from 'path';

const STATIC_CONTENT = path.join(__dirname,process.env.STATIC_CONTENT);


// Initialize http server
const app = express();

// Prettify JSON
app.set('json spaces', 4);

// Logger that outputs all requests into the console
app.use(morgan('combined'));

// Static
app.use('/assets',express.static(STATIC_CONTENT));
// Index
app.use('/', (req, res) => {
    return res.sendFile(path.join(__dirname,'./index.html'));
});

const server = app.listen(8080, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
