import React from "react"
import Weather from "./weather"
import Activity from "./activity"
import Clock from "./clock"
import Stockholm from "./Stockholm"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todaysWeather: null,
      allActivities: []
    }
  }

  componentDidMount() {
    console.log(1)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1b105aada7b8b5bc46bf82a2950796ef").then(response =>
      response.json()).then(json => {
      console.log(2)
      this.setState({
        todaysWeather:
        {
          city: json.name,
          temperature: json.main.temp.toFixed(1),
          weatherDescription: json.weather[0].description,
          iconURL: `//openweathermap.org/img/w/${ json.weather[0].icon }.png`,
          weatherCategory: json.weather[0].main,
          activityLink: String
        }
      })
      this.getActivities()
    })
  }

  getActivities() {
    console.log(3)
    fetch("http://localhost:8080/activities").then(response => (
      response.json()
    )).then(json => {
      console.log(4)
      this.setState({ allActivities: json })
    })
  }

  render() {
    const filteredActivities = this.state.allActivities.filter(activity => {
      const hasRightWeather = activity.weathergroups
        .indexOf(this.state.todaysWeather.weatherCategory)

      const hasMinTemp = activity.mintemp < this.state.todaysWeather.temperature
      const hasMaxTemp = activity.maxtemp > this.state.todaysWeather.temperature

      return hasRightWeather && hasMinTemp && hasMaxTemp
    })

    return (
      <div>
        <div className="weatherOfTheDay">
          <Stockholm />
          <h1>Weather world, Stockholm - whats up?</h1>
            <Clock />
        </div>
        <div>
          {this.state.todaysWeather &&
            <Weather
              city={this.state.todaysWeather.city}
              temperature={this.state.todaysWeather.temperature}
              description={this.state.todaysWeather.weatherDescription}
              iconURL={this.state.todaysWeather.iconURL}
              weatherCategory={this.state.todaysWeather.weatherCategory} />}
        </div>
        <div>
          <p className="activity-text"><u>Activity suggestions</u></p>
        </div>

        <div className="allActivities">
          {filteredActivities.map(activity => {
            return <Activity
              activityName={activity.activityName}
              content={activity.content}
              activityLink={activity.activityLink}
              admissionChildren={activity.admissionChildren}
              admissionAdults={activity.admissionAdults}
              location={activity.location} />
          })}
        </div>
      </div>
    )
  }
}
