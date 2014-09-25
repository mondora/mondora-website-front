# mnd-website application
FROM dockerfile/nodejs
MAINTAINER Paolo Scanferla <paolo.scanferla@mondora.com>
RUN mkdir /mnd-website
ADD ./ /mnd-website/
WORKDIR /mnd-website
RUN npm install
RUN npm run bundle
ENTRYPOINT ["npm", "start"]
