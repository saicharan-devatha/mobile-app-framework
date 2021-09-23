Getting started :
--------------------------------


npm install

```

Configuration files
-------------------------------
```
1.commons.js
  * Sauce details
  * email receipients 
  * proxy pacs

2.groups.js
  * Test case info
  * Browser-Version-Device [To run locally, only pass "Browser-Version"]
```

Running the tests:
-------------------
```
Sauce : npm run smoke-prod_sauce
Local : npm run smoke-prod_local

```

Current device support
--------------------------------
```
iPhone
iPad
Android Phone
Android tablet
```
Framework Details
----------------------------

In this framework, test cases are designed using page objects and it serves as an interface to a page or module of your AUT.
Page objects are designed at module level, hence it can be reused for end to end automation.
Locator information is stored in JS file and test data is stored in csv format.
It is structured in module and device type combination.
Based on the device specified, npm script will execute depending on iOS or Android


##Test Execution
This framework uses grunt to execute the tests. Grunt is a javascript task runner, built on top of Node.js. This framework dynamically generate protractor grunt tasks based on the configuration. Protractor needs two files to run, a configuration file and a test or spec file.

###protractor config:
This configuration file is the starting point for protractor tests. It tells protractor about the Selenium Server, which tests to run, device configs and test framework to use.

###groups config:
This config contains test case group and browser/device mapping.

###Commons config
This file contains common configurations like proxy pac, sauce info, email ilist etc.

###Library
Lib contains common Utilities which inlcude capability builder and retry logics.

##Action sequence diagram

## Features
 - Page Objects
 - Locators Map
 - Multi browser/device support
 - Parallel execution
 - Retry flaky tests
 - Runtime Sauce tunnel
 - Grouping of testcases
 - Multi browser/device html report

##Sample Html Report


##iOS and Android Setup

##Appium setup:
```
- npm install -g appium         # installs appium
- npm install wd                # installs appium client
- appium                        # starts appium
```
Android:
```
- https://developer.android.com/studio          # Get Android studio and create a new emulator same as groups.js emulator
```
#Inspecting elements using appium client
```
- Install appium client
- Open Appium.app from your local machine
- Start server on port 4723
- Click on Start Inspector Session icon
- Set desired capabilities as below

{
  "deviceName": "",                 # give any simulator name present on your local machine
  "platformName": "",               # platform name should go as iOS
  "platformVersion": "",            # current simulator version on your local machine
  "app": "",                        # this argument takes "pointofsalea.app" app path on your local machine
  "noReset":                        # pass boolean value (true)
}
