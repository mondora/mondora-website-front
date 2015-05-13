FROM iojs
MAINTAINER Paolo Scanferla <paolo.scanferla@mondora.com>
RUN mkdir /mondora-website-front
ADD ./ /mondora-website-front/
WORKDIR /mondora-website-front
RUN npm install
ENTRYPOINT ["start.sh"]
