const request = require("request")

const forecast = (latitude,longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=fc57e2037872a8b14d907da2e5668539&query=' + latitude + ',' + longitude + '&units=f'
    //console.log(url)
    request({url, json:true},(error,{body}) => {
        //const {body} = response
        if(error){
            callback('Unable to reach weather service!');
        }else if(body.error){
            callback(body.error.info)
        }else{
            const forecastData = body.current.weather_descriptions[0] + ". Currently it is "+ body.current.temperature + ' degrees. It feels like '+ body.current.feelslike+' degrees. The humidity is at ' + body.current.humidity + '%';
            callback(undefined,forecastData)
        }
    })
}

module.exports = forecast