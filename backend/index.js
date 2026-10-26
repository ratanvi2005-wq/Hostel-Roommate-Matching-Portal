const express = require('express');
const UserRouter = require('./routers/UserRouter');
const HostelRouter = require('./routers/HostelRouter')

const cors = require('cors');

require('./connection');
const app = express();


const port = 5000;

// middleware
app.use(cors({
     origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://localhost:300'],
     credentials: true
}));


app.use(express.json());
app.use("/hostel", HostelRouter);
app.use('/user', UserRouter);

// endpoint or route
app.get('/', (req, res) => {
     res.send('response from express'); 

});

app.get('/add', (req, res) => {
     res.send('response from add');
});
// getall
// update
// delete

app.listen(port, () => {
     console.log('server started');

});