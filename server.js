import * as dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';

import router from './Routes.js'


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', router)

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
})