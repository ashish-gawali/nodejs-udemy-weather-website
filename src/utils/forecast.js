const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0f2006271b70e7a422f411081f1d29f7&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. But it feels like " + body.current.feelslike + " degrees out. The wind direction is: " + body.current.wind_dir + ". While the humidity is: " + body.current.humidity + " .")
        }
    })

}

module.exports = forecast;

