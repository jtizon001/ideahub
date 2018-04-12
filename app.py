import flask
from flask import Flask, request, url_for, jsonify, json, make_response, current_app
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin
import Exporter
from watson_endpoint import watson

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    return flask.send_from_directory('static', 'index.html')


@app.route('/api/form', methods=['GET', 'POST', 'OPTIONS'])
def scrapeForm():
    user = ''
    tweet_amount = ''
    checked = 'false'
    filename = ''
    keyword = ''
    start_date = ''
    end_date = ''
    near = ''
    within = ''
    commandList = []
    if request.method == 'OPTIONS':
        res = flask.make_response()
    if request.method == 'POST':
        formArg = request.get_json()
        checked = formArg.get('checked')
        if checked == True:
            commandList.extend(['--toptweets'])
        user = formArg.get('user')
        if user:
            commandList.extend(['--username', str(user)])
        tweet_amount = formArg.get('tweet_amount')
        if tweet_amount:
            commandList.extend(['--maxtweets', str(tweet_amount)])
        # filename = formArg.get('filename')
        # if filename:
        #     commandList.extend(['--output', str(filename)])
        keyword = formArg.get('keyword')
        if keyword:
            commandList.extend(['--querysearch', str(keyword)])
        near = formArg.get('near')
        if near:
            commandList.extend(['--near', str(near)])
        within = formArg.get('within')
        if within:
            commandList.extend(['--within', str(within)])
        start_date = formArg.get('start_date')
        if start_date:
            commandList.extend(['--since', str(start_date)])
        end_dare = formArg.get('end_date')
        if end_date:
            commandList.extend(['--until', str(end_date)])

        # Makes call to Exporter.py main
        path = Exporter.main(commandList)
        #sent_tweet = getSentiment('./outputfiles/' + path)
        res = flask.make_response(jsonify(res='hello'))

    res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return res


@app.route('/api/getCSV', methods=['GET', 'POST'])
def getCSV():
    if (request.method == 'OPTIONS'):
        res = flask.make_response()
    if (request.method == 'POST'):
        formArg = request.get_json()
        fileName = formArg.get('filename') + ".csv"
        res = flask.make_response()

    res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    res.headers['Content-Disposition'] = 'attachment; filename=' + fileName
    res.headers['Content-Type'] = 'application/octet-stream'
    return flask.send_from_directory('outputfiles', fileName, as_attachment=True)


@app.route('/api/sentiment', methods=['GET', 'POST', 'OPTIONS'])
def getSentiment():
    if request.method == 'OPTIONS':
        res = flask.make_response()
    if request.method == 'POST':
        formArg = request.get_json()
        res = jsonify(watson('./outputfiles/output_got.csv'))
    res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return res


if __name__ == '__main__':
    app.run(debug=True)
