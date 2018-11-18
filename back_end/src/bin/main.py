
import logging

from flask import Flask, request, jsonify
from flask_cors import CORS

from config import configure_logging
from src import groups

LOGGER = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

@app.route('/group', methods=['POST'])
def create_group():
    body = request.json
    try:
        group_id = groups.create_group(body['name'])
        app.logger.info('Create group with %s', group_id)
        return jsonify(group_id)
    except Exception as ex:
        return str(ex), 409

@app.route('/group/<string:group_id>')
def get_group(group_id):
    app.logger.info(group_id)
    try:
        group = groups.get_group(group_id)
        return jsonify(group.to_dict())
    except Exception as ex:
        return str(ex), 404
    
@app.route('/groups')
def get_groups():
    results = groups.get_groups()
    app.logger.info('Returned groups %s', results)
    return jsonify(results)

@app.route('/group/<string:group_id>/participant', methods=["POST"])
def add_participant(group_id):
    body = request.json
    try:
        groups.add_participant(group_id, body)
        return "", 200
    except Exception as ex:
        return str(ex), 404

@app.route('/group/<string:group_id>/participant/<string:participant_name>', methods=['PUT'])
def update_position(group_id, participant_name):
    body = request.json
    try:
        result = groups.update_position(group_id, \
                                        participant_name, body)
        return jsonify(result)
    except Exception as ex:
        return str(ex), 404

@app.route('/group/<string:group_id>/participant/<string:participant_name>', methods=['DELETE'])
def delete_participant(group_id, participant_name):
    groups.delete_participant(group_id, participant_name)
    return ""
        

@app.route('/')
def hello():
    return 'Hello world3'

if __name__ == '__main__':
    configure_logging()
    app.run(host="0.0.0.0")
