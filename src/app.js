const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config 
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup static directory to use
app.use(express.static(publicDir))

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather App ',
        name: 'Abhishek'
    })
})
app.get('/about', (req,res)=> {
    res.render('about',{
        title: 'About me',
        name: 'Abhishek'
    })
})


app.get('/help', (req,res)=> {
    res.render('help',{
        helptext: 'hey how may i help u',
        title: 'Help',
        name: 'Abhishek'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=> {
    if(!req.query.search){
        return res.send({
            errorMessage: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=> {
    res.render('404help', {
        title: '404',
        name: 'abhishek',
        errorMessage: '404 help page not found'
    })
})

app.get('*', (req,res)=> {
    res.render('404', {
        title: '404',
        name: 'abhishek',
        errorMessage: '404 page not found'
    })
})



app.listen(port, ()=> {
    console.log('server is up on ',port)
})