const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=7826671523bd71fe66f9d7ef1dd2709b&query='+latitude+','+ longitude+ '&units=m'
    request({ url, json: true }, (error, {body})=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }else if (body.error){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined, 'it is currently '+body.current.temperature+' degrees out.')
        }
    })
}

module.exports = {
    forecast: forecast 
}