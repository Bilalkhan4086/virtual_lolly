import { navigate } from "gatsby-link"
import * as React from "react"
import Layout from "../components/layout"
import Lolly from "../components/Lolly"


const IndexPage = () => (
  <div className="indexHeaderContainer">
  <Layout>
<div className="indexLollycontainer">
<Lolly cTop="#761576" cMiddle="#e71687" cBottom="#a78312"/>
<Lolly cTop="#721892" cMiddle="#671112" cBottom="#133353"/>
<Lolly cTop="#672727" cMiddle="#a78312" cBottom="#555555"/>
<Lolly cTop="#123441" cMiddle="#764663" cBottom="#336534"/>
<Lolly cTop="#e91313" cMiddle="#244313" cBottom="#a78312"/>
</div>
<button className="indexButton" onClick={()=>{navigate('CreateNew/')}}>Make a new lolly to send to a friend</button>
  </Layout>
  </div>
)

export default IndexPage
