const express = require("express");
const router = express.Router();
const data = require("../data");
const restaurantsData = data.restaurants;
const reviewsData = data.reviews;
const cookieParser = require('cookie-parser');
session = require('express-session');
var xss = require("xss");
console.log('for restaurants in routes')
var bcrypt = require("bcrypt-nodejs");
console.log('inside restor routes')
//Welcome Page
router.get('/new', async(req, res) =>{
    console.log('Calling add new page');
    //const restaurantList = await restaurantsData.get_all_restaurants();
    res.render('restaurants/newRestaurant');
});

router.get('/', async(req, res) =>{
    if(!req.session.userid)
      return res.redirect("./")
    console.log(req.session.userid+ " hai")
    //if(!req.cookies.sessionId)
      //res.send("Invalid")
    console.log("restauratns")
    //console.log(req.cookies.sessionId) 
    //console.log(req.session.id)  
    
    console.log('Calling Welcome page');
    const restaurantList = await restaurantsData.get_all_restaurants();
    res.render('restaurants/restoList',{restaurantList:restaurantList});
});
router.post("/rating", async(request, response)=> {
    
    sorted_restaurant= await data.restaurants.get_restaurants_sorted_by_rating()
    //console.log(sorted_restaurant);
    response.json({ success: true, message: (sorted_restaurant) });
  });
  
router.post("/highprice", async(request, response)=> {
    
    sorted_restaurant= await data.restaurants.get_restaurants_pricey()
    //console.log(sorted_restaurant);
    response.json({ success: true, message: (sorted_restaurant) });
  });
  router.post("/mediumprice", async(request, response)=> {
    
    sorted_restaurant= await data.restaurants.get_restaurants_moderate()
    //console.log(sorted_restaurant);
    response.json({ success: true, message: (sorted_restaurant) });
  });
  router.post("/lowprice", async(request, response)=> {
    
    sorted_restaurant= await data.restaurants.get_restaurants_inexpensive()
    //console.log(sorted_restaurant);
    response.json({ success: true, message: (sorted_restaurant) });
  });
  
router.get("/:id", async (req, res) => {
    try {
      const restaurant= await restaurantsData.get_restaurant_by_id(req.params.id);
     
       const existingReviews = await reviewsData.get_reviews_by_restaurant_id(req.params.id);
      // const currentUser = get the current user pass it as argument 
      // then check in hbs if this. user name is same as current user then enable his comments for editing  
      
      console.log('existing ',existingReviews[0]);
      //console.log('each element: ', restaurant[1].name)
      //res.json(restaurant);
      let logger= await data.users.get_user_by_id(req.session.userid)
      
      console.log(logger.user_id+ "logger") 
      const display = restaurant[0].location;
      console.log('Link', typeof(restaurant[0].url), restaurant[0].url);
      const displayLocation = display.display_address;
      //console.log('displayLocation', displayLocation);
      console.log('categories ', restaurant[0].categories);
      console.log('image url ',restaurant[0].image_url)
      res.render('restaurants/eachResto',{id: req.params.id,
                                          restaurantName: restaurant[0].name, 
                                          restaurantPrice: restaurant[0].price, 
                                          restaurantLocation: displayLocation,
                                          restaurantRating: restaurant[0].rating,
                                          restaurantImage: restaurant[0].image_url,
                                          restaurantCategories: restaurant[0].categories,
                                          restaurantLink: restaurant[0].url,
                                          reviews: existingReviews,
                                          logger: logger.user_id});
    } catch (e) {
        console.log(e)
      res.status(404).json({ error: "Recipe not found" });
    }
  });
  
  router.post("/:id", async (req, res) => {
    options = {
      whiteList: [],
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script']
  };
  getresid = xss.FilterXSS(options);
    try {
        let id=(req.params.id);
       // console.log("id "+id)
        //console.log(req.session.userid+" post")
        let logger=await data.users.get_user_by_id(req.session.userid)
  //      console.log(logger)
        //const reviewPost = {review: req.body.review};
        reviewPost = (req.body.review);
      //  console.log('type of ',typeof(reviewPost));
        //console.log('new ', reviewPost);
      const newReview ={restaurant_id: id,
                    user_name: logger.name,
                post: reviewPost,
            user_id : logger.user_id,
        image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/z_MPkszdL9aXjs59523czA/o.jpg"
    };
    //console.log("Sring ", newReview.post)
      const review = await reviewsData.add_reviews(newReview);
//console.log('DONE!!')
     //res.redirect(req.originalUrl)
        res.redirect(id);
      //console.log('each element: ', restaurant[1].name)
      //res.json(restaurant);
      } catch (e) {
          console.log(e)
      res.status(404).json({ error: e });
    }
  });

//to add a new restaurant



module.exports = router;
