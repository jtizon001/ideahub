import pymysql as MySQLdb
import flask
from flask import Flask, request, url_for, jsonify, json, make_response, current_app
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin
import Exporter
import requests
import json
from watson_endpoint import watson
import ScrapeException
import threading

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='mysql://ideahub:passwordd@localhost/db'
from flask_sqlalchemy import SQLAlchemy
from shutil import copyfile

#app = Flask(__name__)
CORS(app)
db=SQLAlchemy(app)

app.debug=True


@app.route('/', methods=['GET', 'POST'])
def index():
    return flask.send_from_directory('static', 'index.html')


@app.route('/api/form/<x>', methods=['GET', 'POST', 'OPTIONS'])
def scrapeForm(x):
    print('api/form/'+x)
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
        else:
            commandList.extend(['--maxtweets', str(2000)])
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
        #out_file=open('outputfiles/output_got.csv','r').read()
        #print(out_file)
        copyfile('./outputfiles/output_got.csv','./outputfiles/'+x+'.csv')
        
        add_2_db = Sessions(session_id=x,csv='./outputfiles/'+x+'.csv',username=user, keyword=keyword)
        db.session.add(add_2_db)
        db.session.commit()

    print('done writing')
    res.headers['Access-Control-Allow-Origin'] = 'http://dpbld08a.cs.unc.edu'
    res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'

    return res


@app.route('/api/getCSV/<x>', methods=['GET', 'POST'])
def getCSV(x):
    if (request.method == 'OPTIONS'):
        res = flask.make_response()
    if (request.method == 'POST'):
        formArg = request.get_json()

        fileName =x+'.csv' #formArg.get('filename') + ".csv"
        res = flask.make_response()

    res.headers['Access-Control-Allow-Origin'] = 'http://dpbld08a.cs.unc.edu'
    res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    res.headers['Content-Disposition'] = 'attachment; filename=' + fileName
    res.headers['Content-Type'] = 'application/octet-stream'
    return flask.send_from_directory('outputfiles', fileName, as_attachment=True)


@app.route('/api/sentiment/<x>', methods=['GET', 'POST', 'OPTIONS'])
def getSentiment(x):
    print(x)
    if request.method == 'OPTIONS':
        res = flask.make_response()
    if request.method == 'POST':
        formArg = request.get_json()

        res = watson('./outputfiles/'+x+'.csv')
        row=db.session.query(Sessions).filter(Sessions.session_id==x).first()
        row.sentiment=json.dumps(res)
        db.session.commit()
        if res != '!WATSON_ERROR_HEADER':
            res = jsonify(res)
        else:
            res = jsonify(error=str(res))
        #update(sessions).where(session_id==x).\
        #      values(sentiment=res)
 
    res.headers['Access-Control-Allow-Origin'] = 'http://dpbld08a.cs.unc.edu'
    res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return res

class Sessions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(80), unique=True, index=True, nullable=False)
    csv = db.Column(db.Text, nullable=True)
    sentiment = db.Column(db.Text, nullable=True)
    username=db.Column(db.String(80), nullable=True)
    keyword=db.Column(db.String(80), nullable=True)

    def __repr__(self):
        return '<User 5r>' % self.session_id



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443)
