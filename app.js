const express = require("express");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const session = require('express-session'); 
const app = express();
const data=require("./data")
//for CSS
const static = express.static(__dirname + '/public');
const configRoutes = require("./routes");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const hbs =  require('handlebars');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {  
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
        
            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};
app.use("/public", static);
app.use(flash()); 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
hbs.registerHelper("concat", function(status)
{
    //console.log(status)
    return "localhost:3000/restaurants/"+status
});
hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        
        console.log("No")
        return opts.fn(this);
    } else {
        console.log("yes")
        console.log(a)
        console.log(b)
        return opts.inverse(this);
    }
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,  
    saveUninitialized: false
}))

configRoutes(app);
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});