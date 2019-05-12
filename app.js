// Create an express engine and serve data
// Entry point to application
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Handlebars = require('handlebars');
const profiles = require('./data/profiles');

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session")
// Sets up handlebars handling
const handlebarsInstance = exphbs.create({
	extname: 'hbs',
    // defaultLayout: "main",
    helpers: {
        // Get amount of keys in an object
        size: (obj) => {
            let size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
		},
		
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
		},
		
        debug: (value) => {
            console.log("Current Context");
            console.log("====================");
            console.log(this);

            if (value) {
                console.log("Value");
                console.log("====================");
                console.log(value);
            }
		},
		
		not: (option, options) => {
			return !option;
		},

		ifEqual: (arg1, arg2, options) => {
			return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
		},

		ifOr: (arg1, arg2, options) => {
			return (arg1 || arg2) ? options.fn(this) : options.inverse(this);
		}
    },
});


app.use("/public", express.static(__dirname + "/public"));
app.use("/assets", express.static(__dirname + "/assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.engine('hbs', handlebarsInstance.engine);
app.set('view engine', 'hbs');

// session
app.use(session({
    name: "AuthCookie",
    secret: "I am batman",
    resave: false,
    saveUninitialized: true
}));

// session logger
app.use(async function (req, res, next) {
	// output the log to the console
	var date = new Date().toUTCString();
	var auth = (req.session.userid) ? 'Authenticated' : 'Non-Authenticated';
	console.log(`[${date}]: ${req.method} ${req.originalUrl} (${auth} User)`);

	next()
});

configRoutes(app);

app.listen(3000, () => {
	console.log("Listening on port 3000")
});

const cfg = async () => {
    await profiles.configureIndex();
};

cfg().catch(error => {
    console.log(error);
});