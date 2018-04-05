import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox'

class App extends Component {
  state = {
    checked: false,
    csvReady: false,
    currentFileName: '',
  }
  render() {
    return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="IDEAHub"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField hintText="Username" floatingLabelText="Username"
                type="text" id="user"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="Tweets amount" floatingLabelText="Tweets amount"
                type="text" id="tweet_amount"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="CSV file name" floatingLabelText="CSV file name"
                type="text" id="filename"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="Keyword" floatingLabelText="Keyword"
                type="text" id="keyword"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="Location" floatingLabelText="Location"
                type="text" id="near"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField  hintText="Radius" floatingLabelText="Radius"
                type="text" id="within"
                onChange={this.handleChange.bind(this)}/><br/>
          <DatePicker hintText="Start Date" floatingLabelText="Start Date"
                id="start_date" openToYearSelection={true}
                onChange={this.handleStartDateChange.bind(this)}/>
          <DatePicker hintText="End Date" floatingLabelText="End Date"
                id="end_date" openToYearSelection={true}
                onChange={this.handleEndDateChange.bind(this)}/><br/>
          <Checkbox label="Top Tweets" checked={this.state.checked}
                onCheck={this.handleCheck.bind(this)}
                />
          <RaisedButton label="Submit" type="submit"/><br/><br/><br/>
        </form>
        <div className="Option">
          {this.state.csvReady&& <RaisedButton label="Download"
                   href="./test.pdf" download={this.state.currentFileName}/>}
          {this.state.csvReady&& <RaisedButton label="See Analysis"
                   onClick={this.handleAnalysis.bind(this)}/>}
        </div>
        <br/><br/><br/>
      </div>
    </MuiThemeProvider>
    );
  }

  handleChange(e,index,value){
    this.setState({[e.target.id]: index});
  }
  handleStartDateChange(e,date){
    var format_date=date.getFullYear()+"-"+(date.getMonth()+1)+ "-" + date.getDate();
    this.setState({'start_date': format_date});
  }
  handleCheck(){
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }
  handleEndDateChange(e,date){
    var format_date=date.getFullYear()+"-"+(date.getMonth()+1)+ "-" + date.getDate();
    this.setState({'end_date': format_date});
  }
  handleSubmit(e){
    e.preventDefault();
    this.setState({'csvReady':false});
    var file = this.state.filename? this.state.filename+'.csv' : 'output_got.csv';
    this.setState({'currentFileName':file});
    // console.log(this.state.currentFileName);
    console.log(this.state);
    fetch('http://127.0.0.1:5000/api/form', {
      method: 'POST',
      headers: new Headers(
         {"Content-Type": "application/json"}
      ),
      body: JSON.stringify(this.state),
    }).then((result) =>{
    console.log('csv ready');
    // csvReady=true;
    this.setState({'csvReady':true});
    });
  }
  // handleDownload(e,index,value){
  //   e.preventDefault();
  //   console.log(this.state.currentFileName);
  //   window.open(this.state.currentFileName)
  // }
  handleAnalysis(e,index,value){
    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/sentiment', {
      method: 'POST',
      headers: new Headers(
         {"Content-Type": "application/json"}
      ),
      body: JSON.stringify(this.state),
    }).then((result) =>{
    console.log('analysis sent');
    });
  }
}

export default App;
