const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;

async function add_reviews(new_review)
{ 
    //console.log(new_review)
    const reviewCollection =  await reviews();
    //restaurantCollection.insertOne(new_restaurants)
    try{
    const newInsertInformation = await reviewCollection.insertOne(new_review);
    }
    catch(e)
    {
        console.log(e)
    }
    //const newInsertInformation = await restaurantCollection.replaceOne({},new_restaurants, {upsert:true});
    //console.log("Succsfull")
    //const newId = newInsertInformation.insertedId;
    //console.log('NEW ID', newId)
    //const newInsertInformation = await restaurantCollection.insertOne(restaurants);
    //const newId = newInsertInformation.insertedId;
}
async function get_reviews_by_restaurant_id(restaurant_id)
{
    //console.log('inside get reviews')
    const reviewCollection=await reviews()
    let a= await reviewCollection.find({restaurant_id:restaurant_id}).toArray();
    //console.log('done inside get reviews')
    return a
}

module.exports.get_reviews_by_restaurant_id = get_reviews_by_restaurant_id;
module.exports.add_reviews = add_reviews;