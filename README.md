# IDEAhub Documentation

## Details

## User Level
### Access application
Users can find the application at:

``` http://dpbld08a.cs.unc.edu```

### Fields
Once on the web page users are presented with several fields, which act as parameters for the custom Twitter Scraping code implemented. The custom code documentation can be found at:  

```https://github.com/Jefferson-Henrique/GetOldTweets-python```
The mandatory fields that MUST be filled out for application to work as intended are:
- Tweet Amount, which represents the number of tweets to be scrapped

And one or both of the follow
- Keywords, which will scrape tweets that include the keyword.
- Username, which will scrape recent tweets from a specific users account.

The optional fields that narrow the target tweets to scrape are:
- Location, which will scrape tweets posted from the corresponding geolocation.
- Radius, which will scrape tweets within a certain radius of a corresponding geolocation. Requires Location field.
- Start Date, which will scrape tweets starting from a specific date until either there are no more tweets to scrape or the Tweet amount is reached.
- End Date, which will scrape tweets up to a specific date until either there are no more tweets to scrape or the Tweet amount is reached.
- CSV file name, which will act as the download name in the case a user wants to store the scraped Twitter data locally.

### Options
Get Tweets
See Analysis
Download CSV

### Analysis 

## Admin Level
### Installing Project Locally
First Installation (Clone from GitHub)
There is an option to Clone or Download the repository from Github. If Downloaded the project should appear in the user’s local “Downloads” file and they can move the project to any location by copying and pasting or dragging and dropping. Otherwise users can navigate, using Command Line, to the desired location and clone the repository using the commands: 

‘’’
cd (path) 
git clone https://github.com/jtizon001/ideahub.git
’’’ 

After the project is cloned onto the user’s local machine several dependencies must be installed in the both main project directory as well as in the static directory. Must have pip and node installed on local machine.
- While in the main project directory run ‘’’pip install requirements.txt’’’, which contains all of the necessary python packages.
- While in the static directory run ‘’’npm install’’’, which should install all of the necessary JavaScript dependencies.

Then users can test that all dependencies are correct by deploying the application on their localhost. The steps are as follow:
- Navigate to the main project directory and run the command 

‘’’python app.py’’’
- Open another command line window and navigate to the static folder. Then run the command

‘’’npm run start’’’

The project should then open in a browser window hosted on localhost.
