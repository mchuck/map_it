import logging

def configure_logging():
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    # create console handler and set level to info
    handler = logging.StreamHandler()
    handler.setLevel(logging.INFO)
    logger.addHandler(handler)

    # create error file handler and set level to error
    handler = logging.FileHandler('logs.log', 'w', encoding=None)
    handler.setLevel(logging.DEBUG)
    logger.addHandler(handler)
