import logging

from src.groups.group import Group
from src.participants.participant import Participant

GROUPS = {}
LOGGER = logging.getLogger(__name__)

def create_group(group_name):
    group_id = Group.create_id(group_name)
    if group_id in GROUPS:
        raise Exception('Group {} already exists' \
                        .format(group_name))
    else:
        new_group = Group(group_name)
        GROUPS[group_id] = new_group
        return group_id

def get_groups():
    return [g.to_dict_full() for g in GROUPS.values()]

def get_group(group_id):
    if group_id not in GROUPS:
        raise Exception('Group with id {} doesn\'t exist' \
                        .format(group_id))
    else:
        return GROUPS[group_id]

def add_participant(group_id, participant_data):
    group = get_group(group_id)
    participant_name = participant_data['name']
    participant_type = participant_data['type']
    if participant_type not in ('normal', 'guide'):
        raise Exception('invalid participant type')
    new_participant = Participant(participant_name,
                                  participant_type)
    group.add_participant(new_participant)
    LOGGER.info('Added new participant with id: %s',
                new_participant.name)
    

def update_position(group_id, participant_name, position):
    group = get_group(group_id)
    participant = group.get_participant(participant_name)
    latitude = position['lat']
    longitude = position['lon']
    participant.add_position(latitude, longitude)
    return group.to_dict_full()

def delete_participant(group_id, participant_name):
    group = get_group(group_id)
    group.delete_participant(participant_name)
