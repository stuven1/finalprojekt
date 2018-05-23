import React from "react"
import Weather from "./weather"
import Activity from "./activity"
import Clock from "./clock"
import Stockholm from "./stockholm-image.jpg"
import StockholmRight from "./stockholm-image-left.jpg"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todaysWeather: null,
      allActivities: [],
      freeAdmission: false
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

  handleFreeAdmissions=event => {
    const freeOrNotFree = event.target.value
    console.log(event.target.value)

    if (freeOrNotFree === "free") {
      this.setState({ freeAdmission: true })
    } else {
      this.setState({ freeAdmission: false })
    }
}

  render() {
    const filteredActivities = this.state.allActivities.filter(activity => {
      const hasRightWeather = activity.weathergroups
        .indexOf(this.state.todaysWeather.weatherCategory)

      const hasMinTemp = activity.mintemp < this.state.todaysWeather.temperature
      const hasMaxTemp = activity.maxtemp > this.state.todaysWeather.temperature
      const hasFreeAdmisson = this.state.freeAdmission === activity.admissionAdults
      console.log(this.state.freeAdmission)

      return hasRightWeather && hasMinTemp && hasMaxTemp && hasFreeAdmisson
    })

    return (
      <div>
        <div className="weatherOfTheDay">
          <img className="Stockholm" src={Stockholm} alt="Stockholm siluett" />
                <Clock />
            <div>
            <h1><i className="fas fa-angle-double-left"></i>Weather world, Stockholm - whats up?<i className="fas fa-angle-double-right"></i></h1>
            </div>
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
          <p className="activity-text"><u>Activity suggestions</u>
          <select className="select-option" onChange={this.handleFreeAdmissions}>
              <option value="category">option</option>
              <option value="free">Free - Adults</option>
              <option value="notFree">Not Free - Adults</option>
            </select>
          </p>

        </div>
        <div className="allActivities">
          {filteredActivities.map(activity =>{
            return <Activity
              activityName={activity.activityName}
              content={activity.content}
              activityLink={activity.activityLink}
              admissionChildren={activity.admissionChildren}
              admissionAdults={activity.admissionAdults}
              location={activity.location} />
          })}
        </div>
        <div className="box-container-img">
        <img className="StockholmRight" src={StockholmRight} alt="Stockholm siluett right" />
        </div>
      </div>
    )
  }
}
