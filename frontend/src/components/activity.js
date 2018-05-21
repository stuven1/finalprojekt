import React from "react"
import "./activity.css"

class Activity extends React.Component {

  render() {
    const
     { activityName, content, admissionChildren,admissionAdults, activityLink, location }
     = this.props
    const freeAdmissionforChild = admissionChildren ? "Free" : "Not free"
    const freeAdmissionforAdult = admissionAdults ? "Free" : "Not free"

    return (
      <div className="oneActivity">
        <p className="activity-name"><u>{activityName}</u></p>
        <p className="content-text">{content}</p>
        <div className="admission">
          <p className="admission-fee">Children : {freeAdmissionforChild}</p>
          <p className="admission-fee">Adults : {freeAdmissionforAdult}</p>
        </div>
        <p className="location-text">Location : {location}</p>
        <p className="activity-link"><a href={this.props.activityLink} target="_blank">{this.props.activityLink}</a></p>
      </div>
    )
  }
}
export default Activity
