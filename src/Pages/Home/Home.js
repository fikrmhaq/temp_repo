import React, {createRef} from "react"
// import {Grid} from "@material-ui/core"
import {View} from "./Home.View.js"

export default class Home extends React.Component{
      constructor(props){
           super(props)
          this.state = {

           }


       this.Viewref = createRef()
}

   render(){
     return(
          <View ref={this.Viewref} data={this.state} />
        )
 }

} 