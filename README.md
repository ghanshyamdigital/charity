# Charity Application

This is a charity app created by the Collage student and Ghanshyam Digital team. It's one of the few charity apps that aims to address country hunger. With the tap of a button, you can donate a minimum of 5 Rs, which is the amount needed to feed a child for one day.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### MongoDB
  Just go on [official MongoDb website](https://www.mongodb.com/) and download the installer.
  
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/ghanshyamdigital/charity.git
    $ cd charity
    $ yarn install

## Configure app

You will need:

- Set MongoDB Port;

## Running the project

    $ yarn run dev

## Simple build for production

    $ yarn start
