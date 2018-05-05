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
and
- Keywords, which will scrape tweets that include the keyword.
or 
- Username, which will scrape recent tweets from a specific users account.

The optional fields that narrow the target tweets to scrape are:
- Location, which will scrape tweets posted from the corresponding geolocation.
- Radius, which will scrape tweets within a certain radius of a corresponding geolocation. Requires Location field.
- Start Date, which will scrape tweets starting from a specific date until either there are no more tweets to scrape or the Tweet amount is reached.
- End Date, which will scrape tweets up to a specific date until either there are no more tweets to scrape or the Tweet amount is reached.
- CSV file name, which will act as the download name in the case a user wants to store the scraped Twitter data locally.
