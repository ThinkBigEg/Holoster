# Holoster

![twitter_header_photo_1](https://user-images.githubusercontent.com/23415882/55510415-892f3e00-565e-11e9-83e5-2cd7c36bf227.png)

A Social Network app running and developing on Holochain and Angular7

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

At a minimum you will need to have the binaries for the holochain conductor installed on your system. See [the official installation instructions](https://developer.holochain.org/start.html).

Be sure to use the 0.0.10 alpha2 release.

### Running

From the project root run the helper script
```
npm run hc:start
```

or alternatively to call the conductor directly

```
holochain -c ./conductor-config.toml
```


### Networking

If you want to try and connect to other nodes this also requires the holochain networking library [n3h](https://github.com/holochain/n3h).

Instructions for networking can be found in the [conductor config](conductor-config.toml) file.

## Building from Source

### Holochain DNA

Building the DNA also requires that the holochain developer CLI, `hc`, is installed. You can run the helper script

```
npm run hc:build
```

or use the CLI directly

```
mkdir -p dna
cd dna-src
hc package --strip-meta -o ../dna/holoster.hcpkg
```

### UI

```
```

## Built With

* [Holochain](https://developer.holochain.org/)


## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

