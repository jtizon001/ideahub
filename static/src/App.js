import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

class App extends Component {
  render() {
    //const{user,tweet_amount,file_name,keyword} = this.state;
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
          <DatePicker hintText="Start Date" id="start_date"/>
          <DatePicker hintText="End Date" id="end_date"/>
          <RaisedButton label="Submit" type="submit"/>
        </form>
      </div>
    </MuiThemeProvider>
    );
  }
  handleChange(e,index,value){
    var name=e.target.id
    this.setState({[e.target.id]: index});
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.user);
    fetch('http://127.0.0.1:5000/api/byUserName', {
      method: 'POST',
      headers: new Headers(
         {"Content-Type": "application/json"}
      ),
      body: JSON.stringify({user:'myname'}),
    }).then(function (result) {
    console.log(result.user);
    });
  }
}

export default App;
