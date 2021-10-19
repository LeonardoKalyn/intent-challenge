# Ricetta - Intent coding challenge

This is my personal solution to the coding challege proposed by Intent.
I've decided to use Create React App to bootstrap it, and implement my solution using it's structure.
The styling lib of choice was JSS. The design is an original implementation inspired by dark-themes and art.

## Before running

On your terminal, install the required dependencies with:

```bash
yarn install
```

## Running the app

To run the app, use the following command:

```bash
yarn start
```

Then access [http://localhost:3000](http://localhost:3000) to view it in your browser.
Make sure to also check it on phone and tablet screens!

To run the tests, use the following command:

```bash
yarn run test
```

## The Architecture

The architecture of choice is called Screaming Architecture.
In essence, the first layer of folders (the ones under ./src) represent important or relevant concepts.
Then components, utils, algorithms, stores and other development mechanisms are organized into the related folders.
The idea is that implementations and tools are adapted to the project, instead of the project bending for the implementations and tools.
