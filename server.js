let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require('path')
let uniqueValidator = require('mongoose-unique-validator');
let bcrypt = require('bcrypt-as-promised');
let session = require('express-session');

let app = express();
app.use(session({
    secret: 'unicorn',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

mongoose.connect('mongodb://localhost/des_basic_mongoose');

let UsersSchema = new mongoose.Schema({
    fname: {type: String, required: [true, "First name must be at least two letters"], minlength: [2, "First name must be at least two letters"]},
    lname: {type: String, required: [true, "Last name must be at least two letters"], minlength: [2, "Last name must be at least two letters"]},
    email: {type: String, required: [true, "Please enter a valid email"], unique: true},
    password: {type: String, required: [true, "Please enter a valid password"], minlength: [5, "Password must be at least 6 characters"]},
    // city: {type: String},
    // state: {type: String},
    // zip: {type: Number}
}, {timestamps: true})

mongoose.model('User', UsersSchema);
let User = mongoose.model('User');
mongoose.Promise = global.Promise;
UsersSchema.plugin(uniqueValidator);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/angularTask1/dist'));

app.post('/user', function(req, res) {
    console.log('in /user POST route');
    console.log('POST DATA is: ', req.body);

    // let new_user = new User(req.body);

    // req.session.bpwd = bcrypt.hash(req.body["password"], 10)
    bcrypt.hash(req.body["password"], 10)
        .then(hashed_password => {
            console.log("hashed_password is: ", hashed_password)
            let new_user = new User({
                fname: req.body['fname'],
                lname: req.body['lname'],
                email: req.body['email'],
                password: hashed_password
            })
            new_user.save(function(err) {
                if (err) {
                    console.log('error saving new user');
                    res.json({error: err});
                } else {
                    console.log('successfully saved new user');
                    console.log('new user is: ', new_user);
                    // console.log("req.session is: ", req.session)
                    // console.log("req.session['user_id'] is: ", req.session['user_id'])
                    // req.session['user_id'] = new_user['_id']
                    // console.log("req.body.session['user_id'] is: ", req.body.session['user_id'])
                    // let asAString = new_user['id'].toString()
                    // console.log("asAString is: ", asAString)
                    // req.session['user_id'] = {'_id': '0'}
                    req.session['user_id'] = '0'
                    req.session['user_id'] = new_user['_id']
                    console.log("req.session['user_id']: ", req.session['user_id'])
                    
                    res.json({message: "successfully created new User!"})
                }
            })
        })
        .catch(error => {
            console.log("error is: ", error)
        });

    // new_user.save(function(err) {
    //     if (err) {
    //         console.log('error saving new user');
    //         res.json({error: err});
    //     } else {
    //         console.log('successfully saved new user');
    //         console.log('new user is: ', new_user);
    //         res.json({message: "successfully created new User!"})
    //     }
    // })
})

app.post('/finduser', function(req, res) {
    console.log('in /finduser POST route');
    console.log('req.body is: ', req.body)
    // User.findOne({email: req.body['userEmail']}, function(err, user) {
    //     if (err) {
    //         console.log('error finding that user');
    //         res.json({error: err})
    //     } else {
    //         console.log('successfully found that user');
    //         console.log('user is: ', user)
    //         if (user === null) {
    //             res.json({error: "user is null"})
    //         } else {
    //             if (req.body['userPassword'] === user['password']) {
    //                 console.log('user exists in db!')
    //                 res.json({user: user})
    //             } else {
    //                 res.json({error: "incorrect password"})
    //             }
    //         }
    //     }
    // })
    User.findOne({email: req.body['userEmail']}, function(err, user) {
        if (err) {
            console.log('error finding that user');
            res.json({error: err})
        } else {
            console.log('successfully found that user');
            console.log('user is: ', user)
            if (user === null) {
                res.json({error: "user is null"})
            } else {

                bcrypt.compare(req.body['userPassword'], user['password'])
                // console.log("req.body['userPassword'] is: ", req.body['userPassword'])
                // console.log("user['password'] is: ", user['password'])
                    .then( result => {
                        if (result) {
                            // CHECK USER INTO SESSION HERE
                            req.session['user_id'] = user['_id']
                            console.log("req.session['user_id'] is: ", req.session['user_id'])
                            res.json({user: user})
                        } else {
                            res.json({error: "incorrect username or password"})
                        }
                    })
                    .catch( error => {
                        res.json({error: "compare hash password error is: ", error})
                    })

                // console.log("doing this now")
                // bcrypt.compare(req.body['userPassword'], user['password'], function(err, result) {
                //     console.log("in here!!")
                //     if (result) {
                //         console.log("in result")
                //         return res.send();
                //     } else {
                //         console.log("in error")
                //         console.log("err is: ", err)
                //         return err;
                //     }
                // })

                // if (req.body['userPassword'] === user['password']) {
                //     console.log('user exists in db!')
                //     res.json({user: user})

                // } else {
                //     res.json({error: "incorrect password"})
                // }
            }
        }
    })
})

app.post('/cart', function(req, res) {
    console.log("in /cart POST route");

    console.log("req.body.session['user_id'] is: ", req.body.session['user_id'])
    // if ('cart' in req.session) {
    //     for (let i = 0; i < req.session['cart'])
    // }

    // req.session['cart'] = req.body['item_ID'];
    // console.log("req.session['cart'] is: ", req.session['cart'])

    cartArr.push(req.body['item_ID']); 
    console.log("cartArr is: ", cartArr);   

    res.json({message: "added to cart!"});
})

app.get('/checkSession', function(req, res) {
    console.log("in /checkSession GET route");
    console.log("req.session['user_id'] is: ", req.session['user_id']);
    res.json({user_id: req.session['user_id']})
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./angularTask1/dist/index.html"));
})

app.listen(8001, function() {
    console.log("listening on port 8001");
})