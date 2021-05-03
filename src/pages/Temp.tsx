import React from 'react'
import "../styles/Styles.css"
import Lolly from '../components/Lolly'
import { Link } from 'gatsby'
import Layout from '../components/layout'
const inedx = () => {
    return (
        <Layout>
        <div className="mainContainer">
            <div className="Lolly1">
                <Lolly cTop="#d52358" cMiddle='#e87282' cBottom='#deaa43'/>
            </div>
            <div className="TextContainer">
                <div className="firstText">
                Your lolly is freezing. Share it with this link:
                </div>
                <div className="secondText">
                https://vlolly.net/lolly/Xk-_ZUkwP
                </div>
                <div className="thirdText">
                <span className="third1Text">Ali</span>
                <span className="third2Text">Here is my message</span>
                <span className="third3Text">-Bilal</span>
                </div>
                <div className="forthText">
                {"Bilal"} a made this virtual lollipop for you. You can <Link style={{color:"#fff"}} to="/CreateNew">make your own</Link> to send to a friend who deserve some sugary treat which won't rot their teeth...
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default inedx
