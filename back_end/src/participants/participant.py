import time


EVOKE_TIME = 15

class Participant(object):

    def __init__(self, name, _type):
        self.name = name
        self.type = _type
        self.added_time = time.time()
        self.positions = []

    def add_position(self, lat, _long):
        new_position = Position(lat, _long)
        self.positions.append(new_position)

    def to_remove(self):
        curr_time = time.time()

        def to_evoke(time):
            return curr_time - time > EVOKE_TIME
        
        return \
            (len(self.positions) == 0 and to_evoke(self.added_time)) or \
            (len(self.positions) > 0 and \
             to_evoke(self.positions[-1].timestamp))

    def to_dict(self, evict=True):
        if evict:
            curr_time = time.time()
            self.positions = \
                [p for p in self.positions if \
                 curr_time - p.timestamp < EVOKE_TIME]
        return {
            'name': self.name,
            'type': self.type,
            'positions' : \
            [p.to_dict() for p in self.positions]
        }

class Position(object):

    def __init__(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude
        self.timestamp = time.time()

    def to_dict(self):
        return {
            'lat': self.latitude,
            'lon': self.longitude
        }
