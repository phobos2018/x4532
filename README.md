
This is an **Crypto Exchange Mobile App - Bittrex API**  Project written in NativeScript / Angular / Typescript

  
**Advice**:
- To run tns run ios nativescript requires Xcode on osX
- We recommend Visual Studio Code with NativeScript Plugin to enable debbuging
- app have dependency on Cocoapods to build, more info on https://docs.nativescript.org/plugins/cocoapods
- General documentation for NativeScript - https://docs.nativescript.org/

Build process creates *.js and css files, you should not edit them.

### Prerequisites

**Note** you should have **node v6.5.0 or higher** and **npm 3.10.3 or higher**.

* To run the NativeScript app (currently supports 3.x):

```
npm install -g nativescript
npm install -g webpack
```
T
## How to start

```bash
# install the project's dependencies
$ npm install
# fast install (via Yarn, https://yarnpkg.com)
$ yarn install  # or yarn
```

## Mobile app

The mobile app is provided via [NativeScript](https://www.nativescript.org/), an open source framework for building truly native mobile apps.

#### Setup & API keys
1. Generate API key for trading on bittrex.com - here is a help: https://coinigy.freshdesk.com/support/solutions/articles/1000087495-how-do-i-find-my-api-key-on-bittrex-com-
2. Place the API key and API secret in `./app/shared/core-exchange.service.ts` before runnig the app
```
npm install -g nativescript 
```

#### Dev Workflow

You can make changes to files in `./app` folders.
The root module for the mobile app is `./app/app.module.ts`

#### Run

```
iOS:                      tns run ios
Android:                  tns run android
```
