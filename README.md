# IDEAhub Documentation

## Details

An analysis dashboard that provides social media mining, data analysis, and visualization methods. The intended target data deals with the efficacy and safety of vaccines on major social media applications and message boards with an emphasis on Twitter; however, any topic can be analyzed with this tool. We will track keywords, prominent entities, and hashtags pertaining to the parameters inputed.

## User Level
### Access application
Users can find the application at: http://dpbld08a.cs.unc.edu

### Fields
Once on the web page users are presented with several fields, which act as parameters for the custom Twitter Scraping code implemented. The custom code documentation can be found at:  https://github.com/Jefferson-Henrique/GetOldTweets-python


The mandatory fields that MUST be filled out for application to work as intended are:
- Tweet Amount, which represents the number of tweets to be scraped

And one or both of the following
- Keywords, which will scrape tweets that include the keyword.
- Username, which will scrape recent tweets from a specific users account.

The optional fields that narrow the target tweets to scrape are:
- Location, which will scrape tweets posted from the corresponding geolocation.
- Radius, which will scrape tweets within a certain radius of a corresponding geolocation. Requires Location field.
- Start Date, which will scrape tweets starting from a specific date until either there are no more tweets to scrape or the Tweet amount is reached.
- End Date, which will scrape tweets up to a specific date until either there are no more tweets to scrape or the Tweet amount is reached.
- CSV file name, which will act as the download name in the case a user wants to store the scraped Twitter data locally.

### Options
- Submit; after entering the required fields in the main forum the user can click submit, which is an event that triggers the Tweet Scraper. After the tweets are scraped successfully the two following options will appear.
- Download; onclick event that will download the scraped tweets as a CSV.
- See Analysis; onclick event that gets sentiment analysis of the scraped tweets from Watson’s NLU library and renders four visualizations under the original forum that display sentiment for the top five keywords and entities mentioned in the dataset, as well as the overall document sentiment. The documentation for Watson's NLU API can be found at https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/

## Admin Level
### Installing Project Locally
First Installation (Clone from GitHub)

There is an option to Clone or Download the repository from Github. If Downloaded the project should appear in the user’s local “Downloads” file and they can move the project to any location by copying and pasting or dragging and dropping. Otherwise users can navigate, using Command Line, to the desired location and clone the repository using the commands: 

```
cd (path) 
git clone https://github.com/jtizon001/ideahub.git
git remote add origin https://github.com/jtizon001/ideahub.git
``` 

After the project is cloned onto the user’s local machine several dependencies must be installed in the both main project directory as well as in the static directory. Must have pip and node installed on local machine.
- While in the main project directory run ```pip install requirements.txt```, which contains all of the necessary python packages.
- While in the static directory run ```npm install```, which should install all of the necessary JavaScript dependencies.

Then users can test that all dependencies are correct by deploying the application on their localhost. The steps are as follow:
- Navigate to the main project directory and run the command 

```python app.py```
- Open another command line window and navigate to the static folder. Then run the command

```npm run start```

The project should then open in a browser window on localhost.
The project may have the routes set to run on the department server. If this is the case follow these steps:
*In app.py change each
  ```
  res.headers['Access-Control-Allow-Origin'] = 'http://dpbld08a.cs.unc.edu'
  ```
  to
  ```
  res2.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  ```
* In app.py change to app.run command to 
  ```
  app.run()
  ```
* In App.js change each 
  ```
  fetch('http://152.2.133.31:443/api/form/'+sessionNo, {
  ```
  to
  ```
  fetch('http://localhost:5000/api/form/'+sessionNo, {
  ```
* In package.json
  ```"start": "PORT=80 react-scripts start",```
  to
  ```"start": "PORT=3000 react-scripts start",

### Project Management
Command to Pull while in the main project directory.

```
git pull
```
Commands to Push tracked changes to master branch of remote repository while in the main project directory

```
git add .
git commit -m “message for team with what was updated”
git push origin master
```
### Database
We used a mysql database to differentiate each session from each user. 

The MYSQL database only contains one table.
The columns are:
- session_id = randomly generated string to identify user sessions
- csv = file path
- sentiment = response from watson
- username = name of twitter account scraped
- keywords = keywords used to scrap

### Deployment
To redeploy the application on the Computer Science Department's blade follow:
- frontend
``` 
screen -a
sudo su
npm install
npm start
crtl a d 
```
- backend
``` 
screen -a
sudo python3 app.py
crtl a d
```
  
