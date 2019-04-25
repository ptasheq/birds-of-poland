FROM openjdk:13-jdk-alpine

ENV UID=root \
    GID=wheel \
    HOME=/opt/birds-of-poland \
    npm_config_cache=/opt/birds-of-poland/.npm

RUN sed -i 's/http\:\/\/dl-cdn.alpinelinux.org/https\:\/\/mirrors.dotsrc.org/g' /etc/apk/repositories

# Tini will ensure that any orphaned processes get reaped properly.
RUN apk add --no-cache tini
RUN apk --update add nodejs
RUN apk --update add nodejs-npm
RUN apk --update add imagemagick
RUN apk --update add git
RUN apk --update add util-linux

VOLUME $HOME
WORKDIR $HOME

USER $UID:$GID

EXPOSE 8080

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/local/bin/node", "."]


