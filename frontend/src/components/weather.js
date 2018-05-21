import React from "react"
import "./weather.css"

class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    todaysWeather: null
    }
  }

  render() {
    return (
      <div>
        <div className="weather-box">
          <div className="text-boxes">
            <p className="intro-text"><u>Today's weather:</u></p>
            <img className="weather-icon" src={this.props.iconURL} alt={this.props.weatherCategory} />
            <p className="city-text">{this.props.city}</p>
            <p className="weather-description-text">{this.props.description}</p>
            <p className="temperatur-text">{this.props.temperature}°</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Weather
