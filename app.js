// Create an express engine and serve data
// Entry point to application
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Handlebars = require('handlebars');

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

// Sets up handlebars handling
const handlebarsInstance = exphbs.create({
    defaultLayout: "main",
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
});

// Gets our CSS and makes it available in express under the directory public
// Otherwise public is only local to the machine, hence the need for the express.static
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("Listening on port 3000")
});