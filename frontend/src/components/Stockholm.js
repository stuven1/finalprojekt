import React from "react"
import Stockholm from "./stockholm-image.jpg"
import "./Stockholm.css"

class StockholmImg extends React.Component {

  render() {
    return (
      <div>
        <div className="image-box">
          <img className="Stockholm" src={Stockholm} alt="Stockholm siluett" />
        </div>
      </div>
    )
  }
}
export default StockholmImg
