import json
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions,EmotionOptions
from csv_manipulator import TweetCsv


def post(tweet):
    natural_language_understanding = NaturalLanguageUnderstandingV1(
      username="cacede17-f1de-4533-bde9-7f3554bf7030",
      password="frAC0V0rUWTD",
      version='2017-02-27')

    response = natural_language_understanding.analyze(
      text=tweet,
      # features=Features(
      #   entities=EntitiesOptions(
      #     emotion=True,
      #     sentiment=True,
      #     limit=2),
      #   keywords=KeywordsOptions(
      #     emotion=True,
      #     sentiment=True,
      #     limit=2)))
      features=Features(
        emotion=EmotionOptions(
            )))

    #print json.dumps(response, indent=2)
    return response


def watson(path):


    data = TweetCsv(path)
    print('Stripped tweet')
    tweet = data.get_cell(5, 17)
    resp = post(tweet)
    print('Sent analysis complete: "%s"' % resp)
    # Returns the sentiment json to app.py
    return resp
