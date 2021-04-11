const request = require('request')

const geocode = (address,callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoiMGZyYW5reSIsImEiOiJja24waGQ4bXgwbmpyMnFwZjU3enZkbGgyIn0.e49cj3_pZZ06-z_1lvDIIQ'
    request({url, json: true}, (error,{body})=> {
        if(error){
            callback('unable to connect location services!', undefined)
        } else if(body.features.length === 0){
            callback('unable to find location!', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode: geocode
}