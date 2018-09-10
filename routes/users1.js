const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const restData = data.restaurants;
//console.log('1.users')
var bcrypt = require("bcrypt-nodejs");

//Welcome Page
router.get('/', async(req, res) =>{
    //console.log('Calling Welcome page');
    res.render('users/welcome');
});
router.post('/', async(req, res) =>{
    username= req.body.userName;
    password= req.body.userPassword;
    hash=await data.users.get_hashed_password(username)
    //onsole.log(hash)
    if(bcrypt.compareSync(password, hash)) {
        //console.log("true")
        res.redirect("./restaurants")
       } else {
         res.send("Invalid credentials")
       }
});

//For Customers
router.get('/signUp', async(req, res) =>{
    //console.log("inside users routes")
  res.render('users/signUp', {title: "SANIKA"});
});

router.post('/signUp', async(req, res) =>{
    //console.log("inside post signUp")
    try{
        name = req.body.fullName;
        user_id = req.body.userName;
        email = req.body.emailId;
        phone_number = req.body.phoneNumber;
        type = "Customer";
        password = req.body.userPassword;//plsintext password
        //console.log('plain pass:', password)
        //Hashing password
        const saltRounds = 16;
        
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);

       // console.log('Hashed!!!', hash)
        //console.log('Calling addUser')
        const newUser = await userData.addUser(name, user_id, email, phone_number, type, hash);
        res.redirect("restaurants")
        }//end of try
        catch (e){
            //console.log('inside catch');
            console.log(e);            
        }//end of catch
        
});

//For Owners
router.get('/owner/signUp', async(req, res) =>{
    //console.log("inside users routes")
  res.render('users/ownerSignUp');
});

router.post('/owner/signUp', async(req, res) =>{
    console.log("inside owner post signUp")
    try{
        name = req.body.fullName;
        user_id = req.body.userName;
        email = req.body.emailId;
        phone_number = req.body.phoneNumber;
        type = "Owner";
        password = req.body.userPassword;//plsintext password
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
                 res.redirect('/users/owner/signUp/afterSignup');
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

//Changessss************
router.get('/owner/signUp/afterSignup', async(req, res) =>{
    console.log("inside users after signup");
  res.render('users/ownerAfterSignUp');
});

router.get('/owner/signUp/ownerEdit', async(req, res) =>{
    //console.log("inside usersgbvhjbfv after login")
    //console.log("owner edit name " +req.query.restName)
    const rest= await restData.get_restaurant_by_id(req.query.restName);
    //console.log("restaurants");
    //console.log(rest);
  res.render('users/ownerEdit',{restaurantName: rest[0].name, restaurantPrice: rest[0].price,restaurantImage:rest[0].image_url, restaurantLocation: rest[0].location.address1, restaurantCategories:rest[0].categories, restaurantHappyHours:rest[0].happyHours});
});


router.post('/owner/signUp/ownerEdit', async(req, res) =>{
    console.log("inside post owner edit")
    let id=req.query.restName;
    //let rating=req.body.restaurantRating;
    let location=req.body.location;
    let price=req.body.price;
    let happyhours=req.body.happyHours;
    let categories=req.body.categories;
    let imageUrl = req.body.imageUrl;
    console.log("location "+location);
    const updatedData={
        "price":price,
        "happyHours":happyhours,
        "categories":categories,
        "image_url":imageUrl
    };
    try { console.log('inside try');
       const updatedrest = await restData.update_restaurant(id, updatedData)
       res.json(updatedrest);
       
    }//end of try
    catch (e){
        console.log('inside catch');
        console.log(e);            
    }//end of catch


    //console.log("id "+id+  " rating  "+rating)
});


router.post('/owner/signUp/afterSignup', async(req, res) =>{
    console.log("inside post signUp")
    try{
        restID = req.body.restaurantid;
        //console.log('calling from restoData', restID)
        let a = await restData.idExists(restID);
        console.log('return from restData', a.status);
        if(a.status)
            {//id exists go to edit
                console.log("jasmeet inside")
                const rest= await restData.get_restaurant_by_id(restID);
                console.log("rest" +rest);
                let restaurantName=rest[0].id;
                let link='/users/owner/signUp/ownerEdit/?restName='+restaurantName;
                console.log("link  "+ link)
                
                res.redirect(link);
            }
        else//no id enter new resto
            {
                console.log('adding new restaurant')
                //res.render('/owner/signUp/afterSignup', {title: allOwners.message});   
                //res.render('users/ownerAfterSignUp', {title: a.message});
                res.redirect('users/ownerEdit');
            }
        //console.log(restID);
        // if(restID)
        //     {
        //         console.log("jasmeet inside")
        //         const rest= await restData.get_restaurant_by_id(restID);
        //         console.log("name" +rest[0].id);
        //         let restaurantName=rest[0].id;
        //         let link='/users/owner/signUp/ownerEdit/?restName='+restaurantName;
        //         console.log("link  "+ link)
                
        //         res.redirect(link);
               
        //     }
    }
        catch (e){
            console.log('inside catch');
            console.log(e);            
        }//end of catch
        
});
//Changessss************


module.exports = router;


