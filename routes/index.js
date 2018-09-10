const restaurantRoutes = require("./restaurants");
//const usersRoutes = require("./users");
session = require('express-session');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var xss = require("xss");
let count=0;

//const reviewsRoutes = require("./reviews");
const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const restData = data.restaurants;
console.log('1.users')
var bcrypt = require("bcrypt-nodejs");

const constructorMethod = (app) => {
    console.log("inside routes index")
    app.use(cookieParser());
   // app.use("/users", usersRoutes);
console.log('calling /restas');
    app.use("/restaurants", restaurantRoutes);
   /* app.use(session({
        secret: 'project',
        resave: true,
        saveUninitialized: false
      }));
    */
    app.get('/', async(req, res) =>{
       // res.clearCookie(req.cookies.sessionId);
        if(req.query.loginafailed=="true")
            {
                
               
            console.log("yes")    
            res.render('users/welcome',{error: "Invalid Credentials"})
            }
            else{
        console.log('Calling Welcome page');
        
        res.render('users/welcome');
            
     } });
    app.post('/', async(req, res) =>{
        options = {
            whiteList: [],
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script']
        };
        loginCheck = xss.FilterXSS(options);

        username= (req.body.userName);
        password= (req.body.userPassword);
        try{
        hash=await data.users.get_hashed_password(username)
        console.log(hash)
        if(bcrypt.compareSync(password, hash)) {
            console.log("true")
            /*var sid = await data.users.get_id(username)
            console.log(sid+" sid")
            var expiresAt = new Date();
            req.session.id=sid;
            expiresAt.setHours(expiresAt.getHours() + 1);
            res.cookie("sessionId", sid);
            console.log("Index")
            console.log(res.cookie.sessionId)
            req.session.id=await data.users.get_id(username)
            console.log(req.session.id)*/  
            req.session.userid=await data.users.get_id(username)
            console.log(req.session.userid+" index")
            res.redirect("/restaurants")
           } else if(count<2) {

             
             res.redirect("/?loginfailed=true")
             count++;

           }
           else if(count>=2)
            {
                res.redirect("/errorlogin")
            }
        }
        catch(e)
        {
            console.log("efsdg")
            res.redirect("/?loginfailed=true")

        }
    });
app.get("/errorlogin",async (req,res)=>{
    const alertMsg= "You have had your maximum number of attempts"
    res.render("users/errorlogin", {msg:alertMsg});
})
//For Customers
app.get('/signUp', async(req, res) =>{
    console.log("inside users routes")
  res.render('users/signUp');
});

app.post('/signUp', async(req, res) =>{
    options1 = {
        whiteList: [],
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
    };
    signupCheckList = xss.FilterXSS(options1);

    console.log("inside post signUp")
    try{
        name = (req.body.fullName);
        user_id = (req.body.userName);
        email = (req.body.emailId);
        phone_number = (req.body.phoneNumber);
        type = "Customer";
        password = (req.body.userPassword);//plsintext password
        console.log('plain pass:', password)
        //Hashing password
        const saltRounds = 16;
        
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
//CHanngeesssss
const allOwners = await userData.username_exists(user_id);
if(allOwners.status)
{
//add new user
//console.log('Calling addUser')
const newUser = await userData.addUser(name, user_id, email, phone_number, type, hash);
req.session.userid=await userData.get_id(user_id)
res.redirect("restaurants")
}
else //for false status
{
res.render('signUp', {title: allOwners.message}); 
}
////CHnadjhvjkdfgvb
       /* console.log('Hashed!!!', hash)
        console.log('Calling addUser')
        */
        }//end of try
        catch (e){
            console.log('inside catch');
            console.log(e);            
        }//end of catch
        
});

//For Owners
app.get('/owner/signUp', async(req, res) =>{
    console.log("inside users routes")
  res.render('users/ownerSignUp');
});


app.post('/owner/signUp', async(req, res) =>{
    console.log("inside owner post signUp");
    options2 = {
        whiteList: [],
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
    };

    ownerSignupchecklist = xss.FilterXSS(options2);
    try{
        name = (req.body.fullName);
        user_id = (req.body.userName);
        email = (req.body.emailId);
        phone_number = (req.body.phoneNumber);
        type = "Owner";
        password = (req.body.userPassword);//plsintext password
        //Hashing password
        const saltRounds = 16;
        
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);

        
        const allOwners = await userData.username_exists(user_id);
        console.log('Allowners in post route', allOwners)
        if(allOwners.status)
            {
                 //add new user
                 console.log('Calling addUser')
                 const newUser = await userData.addUser(name, user_id, email, phone_number, type, hash);
                 console.log('now redirecting to aftersignup');
                 res.redirect('/owner/signUp/afterSignup');
            }
            else //for false status
            {   console.log('username match');
                res.render('users/signUp', {title: allOwners.message});       
            }
            
        }//end of try
        catch (e){
            console.log('inside catch');
            console.log(e);            
        }//end of catch
        
});
    
    //app.use('/', usersRoutes);
   

    //Changessss************
app.get('/owner/signUp/afterSignup', async(req, res) =>{
    //console.log("inside users fdfdf after login")
    if(!req.session.userid)
        return res.redirect("/")
  
  res.render('users/ownerAfterSignUp');
});

app.get('/owner/signUp/ownerEdit', async(req, res) =>{
    if(!req.session.userid)
        return res.redirect("/")
  
    //console.log("inside usersgbvhjbfv after login")
    //console.log("owner edit name " +req.query.restName)
    console.log("inside fgfg")
    const rest= await restData.get_restaurant_by_id(req.query.restName);
    
    console.log("restaurants");

    //for delete
    
let forDelete = "/owner/signUp/deleted/?restName="+rest[0].id;
console.log('for delete ', forDelete);
res.render('users/ownerEdit',{restaurantid:forDelete,restaurantName: rest[0].name, restaurantPrice: rest[0].price,restaurantnumber:rest[0].display_phone, restaurantImage:rest[0].image_url, restaurantLocation: rest[0].location.display_address, restaurantHappyHours: rest[0].happyHours});

    //console.log(rest);12345
    //res.render('users/ownerEdit',{restaurantName: rest[0].name, restaurantPrice: rest[0].price,restaurantnumber:rest[0].display_phone, restaurantImage:rest[0].image_url, restaurantLocation: rest[0].location.display_address, restaurantHappyHours: rest[0].happyHours});
});


app.post('/owner/signUp/ownerEdit', async(req, res) =>{
    console.log("inside post owner edit");
    // options3 = {
    //     whiteList: [],
    //     stripIgnoreTag: true,
    //     stripIgnoreTagBody: ['script']
    // };
    // ownereditchecklist = xss.FilterXSS(options3);
    // let id=req.query.restName;
    // let location=ownereditchecklist.process(req.body.location);
    // let price=ownereditchecklist.process(req.body.price);
    // let happyhours=ownereditchecklist.process(req.body.happyhours);
    // let name=ownereditchecklist.process(req.body.name);
    // let image=ownereditchecklist.process(req.body.imageurl);
    // let number=ownereditchecklist.process(req.body.number);

    let id=req.query.restName;
    let location=(req.body.location);
    let price=(req.body.price);
    let happyhours=(req.body.happyhours);
    let name=(req.body.name);
    let image=(req.body.imageurl);
    let number=(req.body.number);

    //console.log("inside post categories "+categories);
    const updatedData={
        "price":price,
        "happyHours":happyhours,
        "name":name,
        "image":image,
        "number":number
    };
    console.log(updatedData)
    try {
       const updatedrest = await restData.update_restaurant(id, updatedData);
       const msg = "Updated Successfully";
       res.render('users/ownerEdit',{restaurantName: updatedData.name, restaurantPrice: updatedData.price, restaurantnumber:updatedData.number,restaurantImage:updatedData.image, restaurantHappyHours: updatedData.happyHours, message: msg});       
    }//end of try
    catch (e){
        console.log('inside catch');
        console.log(e);            
    }
});//end of catch


app.post('/owner/signUp/afterSignup', async(req, res) =>{
    console.log("inside post signUp");
    // options4 = {
    //     whiteList: [],
    //     stripIgnoreTag: true,
    //     stripIgnoreTagBody: ['script']
    // };
    //owneraftersignup = xss.FilterXSS(options3);
    try{
        restID = (req.body.restaurantid);
        //console.log('calling from restoData', restID)
        let a = await restData.idExists(restID);
        console.log('return from restData', a.status);
        if(a.status)
            {//id exists go to edit
                console.log("jasmeet inside")
                const rest= await restData.get_restaurant_by_id(restID);
                console.log("rest" +rest);
                let restaurantName=rest[0].id;
                let link='/owner/signUp/ownerEdit/?restName='+restaurantName;
                console.log("link  "+ link)
                
                res.redirect(link);
            }
        else//no id enter new resto
            {
                console.log('adding new restaurant');
                //update the collection
                let b= await restData.add_restaurants(restID);
                console.log('after new restaurant');
                //res.render('/owner/signUp/afterSignup', {title: allOwners.message});   
                //res.render('users/ownerAfterSignUp', {title: a.message});
                let link='/owner/signUp/ownerEdit/?restName='+restID
                console.log(link);
                res.redirect(link)
            }
    }
        catch (e){
            console.log('inside catch');
            console.log(e);            
        }//end of catch
        
});
app.get('/logout', async(req, res) =>{
    //console.log("inside users fdfdf after login")
    req.session.destroy();  
  res.redirect('/');
});

app.get('/ownerLogin', async(req, res)=>{
    console.log('rendering')
    res.render('users/ownerLogin');
})

app.post('/ownerLogin', async (req, res) =>{
        // options5 = {
        //     whiteList: [],
        //     stripIgnoreTag: true,
        //     stripIgnoreTagBody: ['script']
        // };
        // loginCheck1 = xss.FilterXSS(options5);

        //username= loginCheck1.process(req.body.userName);
        //password= loginCheck1.process(req.body.userPassword);
        username= req.body.userName;
        password= req.body.userPassword;
        try{
        hash=await data.users.get_hashed_password(username)
        console.log(hash)
        if(bcrypt.compareSync(password, hash)) {
            console.log("true")
            
            req.session.userid=await data.users.get_id(username)
            console.log(req.session.userid+" index")
            res.redirect("/owner/signUp/afterSignup")
           } else if(count<2) {

             
             res.redirect("/?loginfailed=true")
             count++;

           }
           else if(count>=2)
            {
                res.redirect("/errorlogin")
            }
        }
        catch(e)
        {
            console.log("efsdg")
            res.redirect("/?loginfailed=true")

        }
    });
//Changessss************

app.get('/owner/signUp/deleted', async(req, res) =>{
    console.log("inside delet")
    const rest= await restData.deleteRestaurant(req.query.restName);
    console.log("restaurants "+rest);
    console.log("deletedd")
    res.render("users/deleted");
    // console.log(rest);
    //console.log(rest[0]);
    // res.render('users/ownerEdit',{restaurantName: rest[0].name, restaurantPrice: rest[0].price,restaurantnumber:rest[0].display_phone, restaurantImage:rest[0].image_url, restaurantLocation: rest[0].location.display_address, restaurantHappyHours: rest[0].happyHours});
    });
    app.use("*", (req, res) => {
        res.status(404).json("Not found");
    })
};

module.exports = constructorMethod;