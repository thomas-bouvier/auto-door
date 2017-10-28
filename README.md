# auto-door

Raspberry Pi 3 based garage door opener with NodeJS and React Native.

## Build the React Native application

### Android

You will need Node, the React Native command line interface, a JDK, and Android Studio.

    cd app/HomeAutomation
    react-native run-android

Fore more detailed instructions, please refer to [the official guide](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) (make sure to select Android as your target OS).

### iOS

You will need Node, Watchman, the React Native command line interface, and Xcode (a Mac is necessary).

    cd app/HomeAutomation
    npm install
    react-native run-ios

Fore more detailed instructions, please refer to [the official guide](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) (make sure to select iOS as your target OS).

### Configuration

Don't forget to edit the configuration in `app-config` :

    cp index.example.js index.js
    npm install
    vi index.js

## Install the Node server on the Raspberry Pi

Connect to your Raspberry Pi and clone this repository in `/var/www`.

### Webserver

You will need to install a webserver (nginx ?) to handle incoming requests. Don't forget to configure your router to allow incoming connections. By default, the HTTP protocol uses port 80, and SSH uses port 22. These are the two internal ports you need to expose.

Although nginx is listening on port 80, the Node server itself is listening on a different port (8080). Therefore, you need to configure nginx to act as a reverse proxy :

    server {
        listen 80;
        root /var/www/auto-door/server;
        server_name 192.168.x.x;

        location / {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
        }
    }

Don't forget to reload nginx.

### Node.js

Node.js can easily installed thanks to the node-arm project :

    wget http://node-arm.herokuapp.com/node_latest_armhf.deb
    sudo dpkg -i node_latest_armhf.deb

Once it finishes installing, you can check if it's working by running `node -v`.

### Configuration

Don't forget to configure the Node server in `server`:

    cd /var/www/auto-door/server
    cp config.example.js config.js
    vi config.js

The auth key must match with the application configuration.

### Node server

Don't forget to install the dependencies :

    cd /var/www/auto-door/server
    npm install

The Node server can then be started with `npm start`.

### forever-service

I like to use [forever-service](https://github.com/zapty/forever-service) to provision the Node server as a service, allowing it to automatically start on boot.

    cd /var/www/auto-door/server
    sudo forever-service install auto-door --script server.js

    // to delete it
    sudo forever-service delete auto-door

The service is now created and can be started by running `sudo service auto-door start`. A list of running services can be obtained by running `sudo forever list`.
