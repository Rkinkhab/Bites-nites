const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;

async function add_restaurants(id)
{ 
    console.log("inside new rest "+id);
   
    const restaurantCollection =  await restaurants();
    const newRest={
        "id":id,
        "name":"",
        "image_url":"",
        "location":"",
        "price":"",
        "dislay_phone":""

    }
    console.log(newRest)

    const newInsertInformation = await restaurantCollection.insertOne(newRest);
    
    console.log("Succsfull")
    const newId = newInsertInformation.insertedId;
    return newRest;
    
}
async function get_all_restaurants()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({}).toArray();
    return a
}
async function get_restaurant_by_id(restaurantid)
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({id:restaurantid}).toArray();
    return a
}
async function get_restaurants_name()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({},{name:1}).toArray();
    return a
}

async function get_restaurants_price(r_name)
{
    
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({id:r_name},{price:1}).toArray();
    return a
}

async function get_restaurants_address()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({},{"location.display_address":1}).toArray();
    return a
}

async function get_restaurants_rating()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({},{rating:1}).toArray();
    return a
}

async function get_restaurants_image()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({},{image_url:1}).toArray();
    return a
}

async function get_restaurants_categories()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({},{categories:1}).toArray();
    return a
}

async function get_restaurants_phone()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({},{display_phone:1}).toArray();
    return a
}
async function get_restaurants_sorted_by_rating()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({}).sort({rating:-1}).toArray();
    return a
}

async function get_restaurants_sorted_by_reviews()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({},{review_count:1}).sort({review_count:-1}).toArray();
    return a
}
async function get_restaurants_inexpensive()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({price:"$"}).toArray();
    return a
}

async function get_restaurants_moderate()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({price:"$$"}).toArray();
    return a
}

async function get_restaurants_pricey()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({price:"$$$"}).toArray();
    console.log(a)
    return a
}

async function get_restaurants_highend()
{
    const restaurantCollection=await restaurants()
    let a= await restaurantCollection.find({price:"$$$$"}).toArray();
    return a
}



async function update_restaurant(id, updatedRestaurant)
{
    const restaurantCollection=await restaurants();

    const updatedRestData = {};
    console.log("inside update restaurant")
    console.log("printing len")
    //console.log("len  "+updatedRestaurant.categories[0])

    updatedRestData.price=updatedRestaurant.price;
    console.log("price "+updatedRestData.price)
    //updatedRestData.location.display_address=updatedRestaurant.location;    
   //updatedRestData.categories.title=updatedRestaurant.categories;
    updatedRestData.happyHours=updatedRestaurant.happyHours;
    updatedRestData.name=updatedRestaurant.name;
    updatedRestData.image_url=updatedRestaurant.image;
    updatedRestData.display_phone=updatedRestaurant.number;
    
    console.log("hours  "+ updatedRestaurant.image)
    
    let updateCommand = {
        $set: updatedRestData
    };
    const query = {
        id: id
    };
    console.log("updatedddd "+updatedRestData)

    await restaurantCollection.updateOne(query, updateCommand);
    return await this.get_restaurant_by_id(id);
    
}
async function idExists(restId)
{
console.log('inside idExists', restId);
const restaurantCollection = await restaurants();
let a = await get_restaurant_by_id(restId);
console.log('return from getby id ',a[0]);
if (a[0]!= undefined)
{
return{status: true, message:a[0]};
}
else
{
console.log('for undefined')
return{status: false,
message:"Id doesn't match!"};
}
}

async function deleteRestaurant(id)
{
const restaurantCollection=await restaurants();
const deletionInfo = await restaurantCollection.removeOne({
id: id
});
}

module.exports.deleteRestaurant=deleteRestaurant;

module.exports.idExists=idExists;
module.exports.add_restaurants=add_restaurants;
module.exports.get_restaurants_phone=get_restaurants_phone;
module.exports.get_restaurants_image=get_restaurants_image;
module.exports.get_restaurants_categories=get_restaurants_categories;
module.exports.get_restaurants_name=get_restaurants_name;
module.exports.get_restaurants_address=get_restaurants_address;
module.exports.get_restaurants_price=get_restaurants_price;
module.exports.get_restaurants_rating=get_restaurants_rating;
module.exports.get_restaurants_sorted_by_rating=get_restaurants_sorted_by_rating;
module.exports.get_restaurants_sorted_by_reviews=get_restaurants_sorted_by_reviews;
module.exports.get_restaurants_inexpensive=get_restaurants_inexpensive;
module.exports.get_restaurants_highend=get_restaurants_highend;
module.exports.get_restaurants_moderate=get_restaurants_moderate;
module.exports.get_restaurants_pricey=get_restaurants_pricey;
module.exports.get_all_restaurants=get_all_restaurants;
module.exports.get_restaurant_by_id=get_restaurant_by_id;
module.exports.update_restaurant=update_restaurant;