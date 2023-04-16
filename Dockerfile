FROM golang:1.14.0-alpine

RUN mkdir /app

ADD ./http-server.go /app

WORKDIR /app

RUN go clean --modcache

RUN go build -o main

EXPOSE 3333

CMD ["/app/main"]
