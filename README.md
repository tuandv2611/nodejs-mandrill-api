# Signup-Newsletter

Signup Newsletter via Mandrill's API
Validate name & email if they are empty. Email is validate too.
Use Mandrill's API send email to mailbox, which email is sign-up inform

## Installation

###Step 1

Install [node.js](http://nodejs.org/).

Install [mongodb](https://www.mongodb.org/downloads). Need have to test mongodb for ready! 
(In case, when setting mongodb be trouble, please go to make dir data for mongodb & get permission for it)

### Step 2

You have to sure your divice installed [git](http://github.org)
Fork nodejs-signup-by-mandrill by git
```sh
$git clone git@bitbucket.org:tuandv2611/nodejs-signup-by-mandrill.git
```

### Step 3

After step 2 completed, go to folder source code just fork and run script by command line 

```js
$cd nodejs-signup-by-mandrill
$npm install
```

### Step 4

After step 3 completed, run script by command line

```js
$npm start
```

### Step5

Then load [url] in your browser to access the app: 
[http://localhost:3000](http://localhost:3000) 
or [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

## Reminder

You should do run script bellow if you want mode DEBUG
On MacOS or Linux, run the app with this command:
```js
$ DEBUG=myapp:* npm start
```
On Windows, use this command:
```js
> set DEBUG=myapp:* & npm start
```

#License

Copyright (c) 2015 TuanDV <tuandv2611@gmail.com>




