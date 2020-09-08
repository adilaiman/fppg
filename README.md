# FPPG Card Game
## 1 Roadmap

### 1.1 Main Tasks
- [x] Crash course React over weekend
- [x] Load remote JSON, and store in collections
- [x] Display data on card object
- [x] Make pairs collection, for card pairings
- [x] Display two random cards using a pair
- [x] Add SimplSchema, Validated Methods and PropTypes
- [x] Unit Tests
- [x] Refactor, add comments and JSDOC comments
- [ ] Implement basic styling (I suck at design!)

### 1.2 Bugs
- [x] ~~Able to select two cards before next round~~
- [ ] MongoDB and React sync issues on startup
- [ ] Pairs are able to repeat due to sync issues

---
## 2 How to deploy on a local machine

### 2.1 Installing Meteor
Install meteor
```BASH
https://www.meteor.com/

<Install instructions from the Meteor website>
<MacOS/Linux>
curl https://install.meteor.com/ | sh 

<Windows>
<1 Install Chocolatey>
https://chocolatey.org/install

<2 Install Meteor via Choco>
choco install meteor
```

### 2.1 Running Meteor
```BASH
cd <cloned repo folder>
meteor npm install
meteor
```
If you still get package errors after running these commands you will need to run
```BASH
meteor npm rebuild
```

### 2.2 Run MochaJS unit tests
```BASH
meteor test --driver-package meteortesting:mocha --full-app
```