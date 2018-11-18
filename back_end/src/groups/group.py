import re
import logging

LOGGER = logging.getLogger(__name__)

class Group(object):

    @staticmethod
    def create_id(name):
        group_id = re.sub('[^a-z0-9 ]', '', name.lower())
        group_id = re.sub('\s+', '_', group_id)
        return group_id
        
    def __init__(self, name):
        self.name = name
        self.group_id = self.create_id(name)
        self.participants = {}

    def __str__(self):
        return self.group_id
    
    def to_dict(self):
        return{
            'name': self.name,
            'id': self.group_id
        }

    def to_dict_full(self):
        base = self.to_dict()
        self.participants = {k:v for k,v in self.participants.items() \
                             if not v.to_remove()}
        base['participants'] = \
            [p.to_dict() for p in self.participants.values()]
        return base
 
    def add_participant(self, participant):
        if participant.name in self.participants:
            raise Exception('Participant with the name: {} already exists' \
                            .format(participant.name))
        else:
            if participant.type == 'guide' and \
               not all([p.type=='normal' for p in self.participants.values()]):
                raise Exception('There can only be one guide per room')
            else:                
                self.participants[participant.name] = participant

    def delete_participant(self, participant_name):
        if participant_name in self.participants:
            del self.participants[participant_name]
            
    def get_participant(self, participant_name):
        if participant_name not in self.participants:
            raise Exception('Participant with the name {} doesn\'t exist'\
                            .format(participant_name))
        else:
            return self.participants[participant_name]
