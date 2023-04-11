FROM ubuntu:16.04
# Replace shell with bash so we can source files
RUN apt-get update \
    && apt-get install -y curl vim net-tools iputils-ping \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs
RUN /bin/bash -c "source ~/.bashrc"
RUN npm -v
WORKDIR /SETUP
COPY ./package.json ./
RUN npm install --ignore-scripts
COPY ./ ./
EXPOSE 3000
CMD ["npm", "run", "start"]
