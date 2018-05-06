import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import SvgIcon from 'material-ui/SvgIcon';
import ReactDOM from 'react-dom';
import C3Chart from 'react-c3js';
import './c3.css';
import download from 'downloadjs';

/*--------------------- ICONS ------------------*/
const GitHubIcon = (props) => (
  <SvgIcon {...props}>
      {<path
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>}
  </SvgIcon>
)
const HelpIcon = (props) => (
  <SvgIcon {...props}>
      {<path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>}
  </SvgIcon>
)

class App extends Component {
  state = {
    checked: false,
    csvReady: false,
    currentFileName: '',
    submitted:false,
    analyzing:false,
    help:false,
  }
  //render the inital web page including the form and submit button. Option class render download and analysis option.
  render() {
    return (
    <MuiThemeProvider >
      <div className="App">
        <AppBar
          title="IDEAHub"
          iconElementRight={<IconButton href='https://github.com/jtizon001/ideahub'>  <GitHubIcon/>  </IconButton>}
          iconElementLeft={<IconButton onClick={this.handleHelpOpen.bind(this)}> <HelpIcon/> </IconButton>}
        />
        <Dialog
          title="How to Scrape Your Tweets"
          actions={<FlatButton label="Close" primary={true} onClick={this.handleHelpClose.bind(this)}/>}
          modal={false}
          open={this.state.help}
          onRequestClose={this.handleHelpClose.bind(this)}
        >
          This is an instruction of how to scrape tweets!
        </Dialog>
        <div><br/></div>
        <Card style={{margin:'0 auto',width:'90%',}}>
        <CardHeader
          subtitle="Please refer to help for scraping criteria."
          subtitleStyle={{color:'orange', }}
        />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField hintText="Username" floatingLabelText="Username"
                type="text" id="user"
                onChange={this.handleChange.bind(this)}
                style={{marginRight:'5%',}}/>
          <TextField hintText="Tweets amount" floatingLabelText="Tweets amount"
                type="text" id="tweet_amount"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="Location" floatingLabelText="Location"
                type="text" id="near"
                onChange={this.handleChange.bind(this)}
                style={{marginRight:'5%',}}/>
          <TextField  hintText="Radius" floatingLabelText="Radius"
                type="text" id="within"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="Keyword" floatingLabelText="Keyword"
                type="text" id="keyword"
                onChange={this.handleChange.bind(this)}/><br/>
          <DatePicker hintText="Start Date" floatingLabelText="Start Date"
                id="start_date" openToYearSelection={true}
                onChange={this.handleStartDateChange.bind(this)}/>
          <DatePicker hintText="End Date" floatingLabelText="End Date"
                id="end_date" openToYearSelection={true}
                onChange={this.handleEndDateChange.bind(this)}/>
          <TextField hintText="CSV file name" floatingLabelText="CSV file name"
                type="text" id="filename"
                onChange={this.handleChange.bind(this)}/><br/><br/>
          <Checkbox label="Top Tweets" checked={this.state.checked} labelPosition='left'
                iconStyle={{marginLeft: '-40%',}}
                labelStyle={{}}
                onCheck={this.handleCheck.bind(this)}/><br/>
          <RaisedButton label="Submit" type="submit"/><br/><br/>
        </form>
        </Card>
        <div className="Option">
          <br/>
          {this.state.submitted&& <CircularProgress size={60} thickness={7} />}
          {this.state.csvReady&& <RaisedButton label="Download"
                   onClick={this.handleDownload.bind(this)}
                   style={{marginRight:'3%',}}/>}
          {this.state.csvReady&& <RaisedButton label="See Analysis"
                   onClick={this.handleAnalysis.bind(this)}/>}
          {this.state.analyzing&&<br/>}
          {this.state.analyzing&&<br/>}
          {this.state.analyzing&& <CircularProgress size={60} thickness={7} />}
        </div>
        <br/><br/>
      </div>
    </MuiThemeProvider>
    );
  }
  /*--------------------- HANDLE UI CHANGE IN INITIAL PAGE------------------*/
  handleHelpOpen(e,index,value){
    this.setState({help: true});
  }
  handleHelpClose(e,index,value){
    this.setState({help: false});
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
  /*--------------------- HANDLE API CALLS ------------------*/
  //handle form submission, upon return, render the download and analysis button
  handleSubmit(e){
    e.preventDefault();
    this.setState({'csvReady':false});
    var sessionNo=Math.random().toString(36).substr(2, 9);
    this.setState({'sessionNo':sessionNo});
    ReactDOM.unmountComponentAtNode(document.getElementById('document_sent'));
    ReactDOM.unmountComponentAtNode(document.getElementById('entity_emotions_donut'));
    ReactDOM.unmountComponentAtNode(document.getElementById('keyword_emotions_donut'));
    ReactDOM.unmountComponentAtNode(document.getElementById('document_emotions_donut'));
    ReactDOM.unmountComponentAtNode(document.getElementById('document_emotions_bar'));
    var file = this.state.filename? this.state.filename+'.csv' : 'output_got.csv';
    this.setState({'currentFileName':file});
    this.setState({'submitted': true});
    fetch('http://127.0.0.1:5000/api/form/'+sessionNo, {
      method: 'POST',
      headers: new Headers(
         {"Content-Type": "application/json"}
      ),
      body: JSON.stringify(this.state),
    }).then((result) =>{
    console.log('csv ready');
    // csvReady=true;
    this.setState({'csvReady':true});
    this.setState({'submitted': false});
    });
  }
  //handle download , upon return, server returns the csv file as json and download the file in browser with user given name
  handleDownload(e,index,value){
    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/getCSV', {
      method: 'POST',
      headers: new Headers(
         {"Content-Type": "application/json"}
      ),
      body: JSON.stringify(this.state),
    }).then((result) =>{
    // csvReady=true;
    this.setState({'csvReady':true});
    return result.text();
  }).then((text) =>{
    download(text,this.state.currentFileName,"text/csv");
  });
  }
  //tab change handle change in the keyword and entity section
  handleTabChange (e,index,value) {
    this.setState({'entityTab':value});
  };
  handleKeyTabChange (e,index,value) {
    this.setState({'keyTab':value});
  };
  //upon return, render c3 graphs
  handleAnalysis(e,index,value){
    e.preventDefault();
    this.setState({'analyzing':true});
    fetch('http://127.0.0.1:5000/api/sentiment', {
      method: 'POST',
      headers: new Headers(
         {"Content-Type": "application/json"}
      ),
      body: JSON.stringify(this.state),
    }).then(res => res.json())
    .then(res =>{
      this.setState({'analyzing':false});
      console.log('analysis sent');
      if(res['error']==="WATSON_ERROR_HEADER"){
        ReactDOM.render(<h1>The tweets you tweeted can not be processed by Watson</h1>, document.getElementById("document_sent"));
      }else{
      /*--------------------- OVERALL DOCUMENT SENTIMENT ------------------*/
      const overall_sent = {
        columns: [
          [res['sentiment']['document']['label'], Math.abs(res['sentiment']['document']['score'])*100]
        ],
        type: 'gauge',
        colors: {
          'positive': '#18d223',
          'negative': '#d62728'
        },
      },
      gauge = {
        title: "Overall Sentiment"
      };
      const doc_senti_div=(
          <MuiThemeProvider >
          <Card style={{margin:'0 auto',width:'90%',}}>
          <CardHeader title="Document Sntiment Breakdown" titleStyle={{fontSize:'2em',}}/>
          <div><C3Chart data={overall_sent} gauge={gauge} /></div>
          </Card><br/><br/>
          </MuiThemeProvider>
      );
      ReactDOM.render(doc_senti_div, document.getElementById("document_sent"));
      /*------------------- ENTITY EMOTIONS BREAKDOWN (DONUT) ----------------------*/
      var keyEmo='';
      var key_emotion=[5];
      const entity_donut = {title: "Entities Breakdown"};
      var createReactClass = require('create-react-class');
      var KeyTabs=createReactClass({
        getInitialState: function() {
          return {keyTab: 'a'};
        },
        handleKeyTabChange (e,index,value) {
          this.setState({'keyTab':value});
        },
        render:function(){
          var tabs = []
          for (var i = 0; i < 5; i++) {
            if(res['entities'][i]){
              if(res['entities'][i]['emotion']){
                keyEmo=res['entities'][i]['emotion']
                key_emotion[i] = {
                  columns: [
                    ['sadness', keyEmo['sadness']],['disgust', keyEmo['disgust']],['joy', keyEmo['joy']],['anger', keyEmo['anger']],['fear', keyEmo['fear']]
                  ],
                  type: 'donut'
                };
                tabs.push(
                  <Tab label={res['entities'][i]['text']} >
                    <C3Chart data={key_emotion[i]} donut={entity_donut} />
                  </Tab>
                );
              }else{
                tabs.push(
                  <Tab label={res['entities'][i]['text']}>
                  <p>Emotions Breakdown Not Available for This Entity</p>
                  </Tab>
                );
              }
            }
          }
          return(
            <MuiThemeProvider >
            <Card style={{margin:'0 auto',width:'90%',}}>
            <CardHeader title="Entities Breakdown" titleStyle={{fontSize:'2em',}}/>
            <Tabs
              id={this.state.keyTab}
              onChange={this.handleKeyTabChange.bind(this)}
            >{tabs}</Tabs>
            </Card><br/><br/>
            </MuiThemeProvider>
          )
        }
      });
      ReactDOM.render(
        <KeyTabs/>
        ,document.getElementById('entity_emotions_donut')
      )

      /*------------------- KEYWORD EMOTIONS BREAKDOWN (DONUT) ----------------------*/
      var keyEmo='';
      var key_emotion=[5];
      const key_donut = {title: "Emotions Breakdown"};
      var KeyTabs=createReactClass({
        getInitialState: function() {
          return {keyTab: 'a'};
        },
        handleKeyTabChange (e,index,value) {
          this.setState({'keyTab':value});
        },
        render:function(){
          var tabs = []
          for (var i = 0; i < 5; i++) {
            if(res['keywords'][i]){
              if(res['keywords'][i]['emotion']){
                keyEmo=res['keywords'][i]['emotion']
                key_emotion[i] = {
                  columns: [
                    ['sadness', keyEmo['sadness']],['disgust', keyEmo['disgust']],['joy', keyEmo['joy']],['anger', keyEmo['anger']],['fear', keyEmo['fear']]
                  ],
                  type: 'donut'
                };
                tabs.push(
                  <Tab label={res['keywords'][i]['text']} >
                    <C3Chart data={key_emotion[i]} donut={key_donut} />
                  </Tab>
                );
              }else{
                tabs.push(
                  <Tab label={res['keywords'][i]['text']} >
                  <p>Emotion Breakdown Not Available for This Keyword</p>
                  </Tab>
                );
              }
            }
          }
          return(
            <MuiThemeProvider >
            <Card style={{margin:'0 auto',width:'90%',}}>
            <CardHeader title="Keywords Breakdown" titleStyle={{fontSize:'2em',}}/>
            <Tabs
              id={this.state.keyTab}
              onChange={this.handleKeyTabChange.bind(this)}
            >{tabs}</Tabs>
            </Card><br/><br/>
            </MuiThemeProvider>
          )
        }
      });
      ReactDOM.render(
        <KeyTabs/>
        ,document.getElementById('keyword_emotions_donut')
      )

      /*------------------- DOCUMENT EMOTIONS BREAKDOWN (DONUT) ----------------------*/
      const doc_emotions_donut = {
        columns: [
          ['sadness', res['emotion']['document']['emotion']['sadness']],
          ['disgust', res['emotion']['document']['emotion']['disgust']],
          ['joy', res['emotion']['document']['emotion']['joy']],
          ['anger', res['emotion']['document']['emotion']['anger']],
          ['fear', res['emotion']['document']['emotion']['fear']]
        ],
        type: 'donut'
      },
      donut = {
        title: "Emotions Breakdown"
      };
      const doc_emo_div=(
          <MuiThemeProvider >
          <Card style={{margin:'0 auto',width:'90%',}}>
          <CardHeader title="Document Emotion Breakdown Donut" titleStyle={{fontSize:'2em',}}/>
          <div><C3Chart data={doc_emotions_donut} donut={donut}/></div>
          </Card><br/><br/>
          </MuiThemeProvider>
      );
      ReactDOM.render(doc_emo_div, document.getElementById('document_emotions_donut'));

      /*------------------- DOCUMENT EMOTIONS BREAKDOWN (BAR) -----------------------*/
      const doc_emotions_bar = {
        x: 'x',
        columns: [
          ['x', 'sadness', 'disgust', 'joy', 'anger', 'fear'],
          ['sadness', res['emotion']['document']['emotion']['sadness'], 0, 0, 0, 0],
          ['disgust', 0, res['emotion']['document']['emotion']['disgust'], 0, 0, 0],
          ['joy', 0, 0, res['emotion']['document']['emotion']['joy'], 0, 0],
          ['anger', 0, 0, 0, res['emotion']['document']['emotion']['anger'], 0],
          ['fear', 0, 0, 0, 0, res['emotion']['document']['emotion']['fear']]
        ],
        groups: [
          ['sadness', 'disgust', 'joy', 'anger', 'fear']
        ],
        type: 'bar',
      },
      axis = {
        x: {
          type: 'category'
        },
        rotated: true
      },
      bar = {
        width: 50,
        title: 'Emotions'
      };
      const doc_emo_bar=(
          <MuiThemeProvider >
          <Card style={{margin:'0 auto',width:'90%',}}>
          <CardHeader title="Document Emotion Breakdown Bar" titleStyle={{fontSize:'2em',}}/>
          <div><C3Chart data={doc_emotions_bar} bar={bar} axis={axis} /></div>
          </Card>
          </MuiThemeProvider>
      );
      ReactDOM.render(doc_emo_bar, document.getElementById('document_emotions_bar'));
    }
    });
  }
}

export default App;
