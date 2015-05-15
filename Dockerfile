FROM iojs
MAINTAINER Paolo Scanferla <paolo.scanferla@mondora.com>
RUN mkdir /mondora-website-front
ADD ./ /mondora-website-front/
WORKDIR /mondora-website-front
RUN npm install --unsafe-perm
EXPOSE 8080
ENTRYPOINT ["./start.sh"]
