import flask
from flask import Flask, request, url_for, jsonify, json
from flask_restful import reqparse, abort, Api, Resource

import Exporter

app=Flask(__name__)


@app.route('/',methods=['GET','POST'])
def index():
	return flask.send_from_directory('static', 'index.html')


@app.route('/byUserName',methods=['GET','POST'])
def scrapeByUser():
	if request.headers['Content-Type']=='application/json':
		usernameArg=request.get_json()
		print('chicken')
		username=usernameArg['username']
		print(username)
		Exporter.main(['--username', username, '--maxtweets', '1'])
		return 'hello'





if __name__=='__main__':
	app.run(debug=True)