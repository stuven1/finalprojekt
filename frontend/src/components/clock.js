import React from "react"
import "./clock.css"
// import Stockholm from "./stockholm-image.jpg"

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  clockName = () => {
    this.state.date.getMinutes()
  }

  render() {
    return (
      <div>
        <div className="time-box">
          <p className="clock-text">Time: {this.state.date.toLocaleTimeString()}</p>
        </div>
      </div>
    )
  }
}

export default Clock
