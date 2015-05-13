FROM iojs
MAINTAINER Paolo Scanferla <paolo.scanferla@mondora.com>
RUN mkdir /mondora-website-frontend
ADD ./ /mondora-website-frontend/
WORKDIR /mondora-website-frontend
RUN npm install
ENTRYPOINT ["start.sh"]
