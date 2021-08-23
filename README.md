# SPAship 
SPAship is an early-stages Single-Page App deployment and hosting platform.

## Packages

SPAship consists of a few packages, found inside the `packages` directory.

- **Manager** - Backend system for managing SPA Workflow
- **Manager UI** - A web UI for managing SPAs

## Set Up Env & Run SPAShip Manager 

### Mac OS

- ENV Setup

```
git clone https://github.com/spaship/spaship-manager.git
cd spaship-manager
npm i
```

- RUN SPAShip Manager 
```
npm run start
```

### Linux

For running SPAShip on Linux (preferably ubuntu) you have to setup the env. for SPAShip Manager & SPAShip Manager-UI seperately.

- Steps: 

1. Clone the Reository

```
git clone https://github.com/spaship/spaship-manager.git
cd spaship-manager
```

2. Configure Manager

```
cd manager

sudo apt  --force-yes install -y libssl-dev
sudo apt-get --force-yes install -y  libpcre3 libpcre3-dev
sudo apt-get install libssl-dev
sudo  apt --force-yes install  -y libgit2-dev
sudo sudo dpkg --add-architecture i386
sudo sudo apt-get update
sudo sudo apt-get --force-yes install -y libstdc++6:i386 libgcc1:i386 libcurl4-gnutls-dev:i386

sudo npm install
sudo npm i nodegit
```

3. Configure Manager-UI

```
cd ../manager-ui

sudo sudo dpkg --add-architecture i386
sudo sudo apt-get update
sudo sudo apt-get --force-yes install -y libstdc++6:i386 libgcc1:i386 libcurl4-gnutls-dev:i386

sudo npm install
sudo npm i nodegit
```

4. RUN SPAShip Manager

```
cd ../../

npm run start
```

### Windows

For running SPAShip on Windows you must have Windows Subsystem for linux installed in your system, or you can download and configure ubuntu (vrs. >=18.4 LTS) from Microsoft Store. After installing, Please execute the following commands in your WSL CLI.

1. Clone the Reository

```
git clone https://github.com/spaship/spaship-manager.git
cd spaship-manager
```

2. Configure Manager

```
cd manager

sudo apt-get update
sudo apt-get --force-yes upgrade  -y
sudo apt-get dist-upgrade
sudo apt-get  install -y build-essential
sudo  apt-get install sudo

sudo apt-get install --yes curl
sudo apt update
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get  --force-yes install -y nodejs
sudo apt-get install --yes build-essential
sudo apt-get install --only-upgrade bash

sudo apt  --force-yes install -y libssl-dev
sudo apt-get --force-yes install -y  libpcre3 libpcre3-dev
sudo apt-get install libssl-dev
sudo  apt --force-yes install  -y libgit2-dev
sudo sudo dpkg --add-architecture i386
sudo sudo apt-get update
sudo sudo apt-get --force-yes install -y libstdc++6:i386 libgcc1:i386 libcurl4-gnutls-dev:i386

sudo npm install
sudo npm i nodegit
```

3. Configure Manager-UI

```
cd ../manager-ui

sudo sudo dpkg --add-architecture i386
sudo sudo apt-get update
sudo sudo apt-get --force-yes install -y libstdc++6:i386 libgcc1:i386 libcurl4-gnutls-dev:i386

sudo npm install
sudo npm i nodegit
```

4. RUN SPAShip Manager

```
cd ../../

npm run start
```

## Testing

SPAship packages can be tested in one command by running `npm test` at the root of the repository.

You can also test individual packages by moving into their directory and running `npm test`. For example:

```
cd packages/common
npm test
```

Each package may have extra testing options. Please see package READMEs for more about testing them, such as how to run a test watcher.

## Contributing

Contributing is awesome! :sunglasses: This section is very much in progress, but here are a handful of established contribution guidelines.

### Commit message style

We use [Conventional Commits][conventional]. It's a simple, standardized way to prefix commit messages. The major benefits are that CHANGELOGs can be updated automatically, and version bumps can also be automated. Please visit [conventionalcommits.org][conventional] and read up on how to use it. It's painless, I promise!

Also, if you're working in a development branch, please don't worry about proper commit message format. Stick to the "commit early & often" mantra. The only requirement is that when your pull request is merged, choose "Squash & Merge" and write a proper conventional-commit message. Here's a short screencap of how to do that.

![squash and merge screencap][squashgif]
