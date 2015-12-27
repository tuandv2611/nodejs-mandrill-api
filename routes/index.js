var express = require('express'),
    validator = require('validator'),
    mongoClient = require('mongodb').MongoClient,
    router = express.Router(),
    mandrill = require('mandrill-api/mandrill'),
    mandrill_client = new mandrill.Mandrill('SAMCBFVD5NEqlo8gRTidSw');
    
validator.extend('isWhitespace', function (str) {
    return (str === null || str === "" || /^\s+$/.test(str));
});

function saveMongodb(data) {
    mongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
        if (err) {
          throw err;
        }
        if ( typeof data !== 'object') throw data;
        
        db.collection('signups').insert(data, function(err, result) {
            if (err) {
              throw err;
            }
            db.collection('signups').find().toArray(function(err, result) {
                if (err) {
                  throw err;
                }
                console.log(result);
            });
        });
    });  
};

function mandrillSend (name, email, successCb, failureCb) {
    var template_name = "Test test-template",
        template_content = [{}],
        message = {
            "from_email": "support@your.rentals",
            "from_name": "Mr.Support",
            "to": [{
                "email": email ? email : "mr.daskine@gmail.com",
                "name": name ? name : "Mr Daskine",
                "type": "to"
            }],
            "headers": {
                "Reply-To": "support@your.rentals"
            },
            "global_merge_vars": [
                {
                    "name": "USER_EMAIL",
                    "content": email ? email : "mr.daskine@gmail.com"
                },
                {
                    "name": "USER_NAME",
                    "content": name ? name : "Mr Daskine"
                },
                {
                    "name": "SUBJECT",
                    "content": "Thanks for signing-up"
                }
            ],
            "merge_vars": [
                {
                    "rcpt": "support@your.rentals",
                    "vars": [{}]
                }
            ]
        },
	async = false,
	ip_pool = "Main Pool",
	send_at = null;

    mandrill_client.messages.sendTemplate(
        {
            "template_name": template_name, 
            "template_content": template_content, 
            "message": message, 
            "async": async, 
            "ip_pool": ip_pool, 
            "send_at": send_at
        }, 
        
        function(result) {
            var data = {
                user_name: name,
                user_email: email,
                status: result[0].status,
                result: result[0]
            };
            saveMongodb(data);
            successCb();
        }, 
        function(e) {
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            failureCb();
        }
    );
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign-up Newsletter'});
});

router.post('/', function(req, res, next) {
    
    var userName = req.body.user_name,
        userEmail = req.body.user_email,
        user_name = {value: userName, message: ''},
        user_email = {value: userEmail, message: ''};
        
    if (validator.isWhitespace(userName)) {
        user_name.message = 'User is required!';
    }
    if (validator.isWhitespace(userEmail)) {
        user_email.message = 'Email is required!';
    } else if (!validator.isEmail(userEmail)) {
        user_email.message = 'Email it not valid';
    }
    if (user_name.message === '' && user_email.message === '') {
        mandrillSend(
            userName, 
            userEmail, 
            function () {
                res.render(
                    'success', 
                    { 
                        title: 'Sign-up Newsletter', 
                        message: 'Thanks for sign-up' 
                    }
                );
            },
            function () {
                res.render(
                    'index', 
                    { 
                        title: 'Sign-up Newsletter',  
                        user_name: user_name, 
                        user_email: user_email, 
                        message: 'Sorry! Sign-up is failure'
                    }
                );
            }
        );
    } else {
        res.render(
            'index', 
            { 
                title: 'Sign-up Newsletter',  
                user_name: user_name, 
                user_email: user_email
            }
        );
    }
});

module.exports = router;
