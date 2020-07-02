const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast =require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectiryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectiryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashish Gawali'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashish Gawali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Ashish Gawali',
        message: 'This is the help page tryin to help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address!'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude,(error, forecastData = '')=>{
            if(error){
                return res.send({error});
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            });
        })
    })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404 Not found',
        error:'Help article not found',
        name:'Ashish Gawali'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 Not found',
        error:'Page not found',
        name:'Ashish Gawali'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port);
});