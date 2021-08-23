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

- ENV Setup

For running SPAShip on Linux (preferably ubuntu) you have to setup the env. for SPAShip Manager & SPAShip Manager-UI seperately.

- Steps: 

1. Clone the Reository

```
git clone https://github.com/spaship/spaship-manager.git
cd spaship-manager
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
