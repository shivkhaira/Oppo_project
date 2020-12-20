import React, { Component } from "react";

class Timer extends Component {
    constructor(props){
      super(props)
      this.tick = this.tick.bind(this)
      this.UpdateHandler = this.UpdateHandler.bind(this)
      this.state = {seconds: props.seconds}
    }

    UpdateHandler(){
        this.setState({seconds: this.props.seconds})
        this.timer = setInterval(this.tick, 1000);
      };

    componentDidMount(){
      this.timer = setInterval(this.tick, 1000);
    }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
    tick(){
      if (this.state.seconds > 0) {
        this.setState({seconds: this.state.seconds - 1})
      } else {
        clearInterval(this.timer);
        //window.location.reload();
        this.props.TimerHandler()
      
         
        
      }
    }
    render(){
      return <div style={{width: "100%", textAlign: "center"}}>
        <h1>{this.state.seconds}</h1>
      </div>
    }
  }

  export default Timer