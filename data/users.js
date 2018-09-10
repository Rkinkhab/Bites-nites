const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("uuid");


const exportedMethods  = {
    async addUser(name, user_id, email, phone_number, type, hash)
    { 
        const userCollection =  await users(); 
        const newUser = {
            _id: uuid.v4(),
            type: type,
            name: name,
            user_id: user_id,
            email: email,
            phone_number: phone_number,
            password: hash
        }
        const newUserInformation = await userCollection.insertOne(newUser);
        console.log("Done Insert to collection")
        //return(newUserInformation);
    },
    async get_id(username)
    {
        const userCollection=await users()
        let a= await userCollection.find({user_id:username}).toArray();
        return a[0]._id
    },
    async username_exists(username)
    {
        const userCollection=await users();
        let a= await userCollection.find({user_id:username}).count();
        if(a>0)
            {
                console.log('sending error');
                return {
                    status: false,
                    message: "User Name already Exists!!"
                };
            }
        else
            {
                return {
                    status: true,
                    message: "Go ahead!"
                };
            }

    }, 
     async get_hashed_password(username) {
        console.log(username)
        const userCollection=await users()
        let a= await userCollection.find({user_id:username},{password:1, _id:0}).toArray();
        console.log(a)
        console.log(a[0].password)
        return a[0].password; 
     },  
     async get_user_by_id(id) 
     {
        const userCollection=await users()
        let a= await userCollection.find({_id:id}).toArray();
        return a[0];
     }
    
       
        
    }

//module.exports.get_hashed_password=get_hashed_password;
module.exports=exportedMethods;

