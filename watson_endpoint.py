# import json
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions
from csv_manipulator import TweetCsv
import codecs


def post(tweet):
    natural_language_understanding = NaturalLanguageUnderstandingV1(
      username="cacede17-f1de-4533-bde9-7f3554bf7030",
      password="frAC0V0rUWTD",
      version='2017-02-27')

    response = natural_language_understanding.analyze(
      text=tweet,
      features=Features(
        entities=EntitiesOptions(
          emotion=True,
          sentiment=True,
          limit=2),
        keywords=KeywordsOptions(
          emotion=True,
          sentiment=True,
          limit=2)))

    # print json.dumps(response, indent=2)
    return response


def watson(path):
    data = TweetCsv(path)
    tweet = data.get_cell(5, 2)
    print('Stripped tweet')
    resp = post(tweet)
    print('Sent analysis complete: "%s"' % resp)
    store_file('output_got_sent', resp)
    return resp


def store_file(name, data):
    sentOutput = codecs.open('./outputfiles/' + name, "w+", "utf-8")
    sentOutput.write(repr(data))
    sentOutput.close()
    print('Sent analysis stored...')


