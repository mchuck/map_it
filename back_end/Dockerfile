FROM ubuntu:latest
MAINTAINER Maciej Sz.
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY src/ src/
COPY requirements.txt requirements.txt
COPY run.sh run.sh
RUN chmod 777 ./run.sh

WORKDIR ./
RUN pip install -r requirements.txt


EXPOSE 5000
RUN ls
ENTRYPOINT ./run.sh
