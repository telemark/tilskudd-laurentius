[![Build Status](https://travis-ci.org/telemark/tilskudd-laurentius.svg?branch=master)](https://travis-ci.org/telemark/tilskudd-laurentius)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tilskudd-laurentius.svg)](https://greenkeeper.io/)

# tilskudd-laurentius

## Innhold
- [Arbeidsflyt](docs/workflow.md)
- [Regler](docs/rules.md)

## Docker

Build

```sh
$ docker build -t tilskudd-laurentius .
```

### Usage

```sh
$ docker run --env-file=docker.env --volume=/test/data/jobs:/src/test/data/jobs --rm tilskudd-laurentius
```

This will start a container. Do the job. Stop the container and remove it.

## License

[MIT](LICENSE)

![Robohash image of tilskudd-laurentius](https://robots.kebabstudios.party/tilskudd-laurentius.png "Robohash image of tilskudd-laurentius")