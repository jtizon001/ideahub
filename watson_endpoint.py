import json
from watson_developer_cloud import NaturalLanguageUnderstandingV1,WatsonException
from watson_developer_cloud.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions, SentimentOptions, EmotionOptions
from csv_manipulator import TweetCsv
import codecs


# Communicates with Watson NLU API
def post(tweet):
    natural_language_understanding = NaturalLanguageUnderstandingV1(
        username='912e28dd-f8ff-4ab5-9645-557ff6b7c597',
        password='N7vecbexz7gQ',
        version='2017-02-27')

    response = natural_language_understanding.analyze(
      text=tweet,
      features=Features(
        entities=EntitiesOptions(
          emotion=True,
          sentiment=True,
          limit=5),
        sentiment=SentimentOptions(
          document=True),
        keywords=KeywordsOptions(
          emotion=True,
          sentiment=True,
          limit=5),
        emotion=EmotionOptions(
            document=True)))
    return response


# Handler for stripping tweets, posting, and storing
def watson(path):
    data = TweetCsv(path)
    tweet = data.isolate_tweets()
    print('Stripped tweet')
    # resp = post(tweet)
    try:
        resp = post(tweet)
    except (UnicodeDecodeError, WatsonException) as err:
        resp='WATSON_ERROR_HEADER'
    #print('Sent analysis complete: "%s"' % resp)
    if resp!='WATSON_ERROR_HEADER':
        store_file('output_got_sent', resp)
    return resp


# Stores file in output files
def store_file(name, data):
    output = codecs.open('./outputfiles/' + name + '.txt', "w+", "utf-8")
    output.write(repr(data))
    print('Sent analysis complete: "%s"' % json.dumps(data, sort_keys=True, indent=4))
    output.close()
    print('Sent analysis stored...')
