const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user')

const app = express();
app.use(bodyParser.json());



app.use('/api',graphqlHttp({
    schema: buildSchema(`

    type Event{
        _id:ID!
        name:String!
        price:String!
        destination:String!

    }

    type User{
        _id:ID!
        username:String!
        password:String
    }

    type RootQuery {
        events:[Event!]!
    }

    input eventInput{
        name:String
        price:String
        destination:String
    }

    input userInput{
        username:String!
        password:String!
    }

    type RootMutation{
        createEvent(eventinput: eventInput):Event
        createUser(userinput: userInput): User
    }
    
    schema{
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue:{
        events:()=>{
           return Event.find().then(event=>{
                return event.map(eve=>{
                    return {...eve._doc}
                });
            }).catch(err=>{
                console.log("err in finding data")
            })
        },
        createEvent:async (args)=>{
        
           const event = new Event({
                name:args.eventinput.name,
                price:args.eventinput.price,
                destination:args.eventinput.destination
           });
        //    const result = await event.save();
        //    console.log(result)
        //     // event.save().then(result =>{
        //    console.log("hryyy",result);
        //    return result;
        //     // }).catch(err =>{
        //          // })
          return  event.save().then(result =>{
                console.log(result)
                return result;

                
            }).catch(err =>{
                throw new Error("absolut error");
            })
          
        },
        createUser: args=>{
           return User.findOne({username:args.userinput.username}).then(user=>{
                if(user){
                    throw new Error("username already exist");
                }
                return  bcrypt.hash(args.userinput.username,10)
                
            }).then(hashedvalue=>{
                const user = new User({
                    username : args.userinput.username,
                    password: hashedvalue
                })
                return user.save().then(result=>{
                    console.log(result)
                    return {...result._doc};//aaaa
                })
            }).catch(err=>{
                throw err;
            })
           
            
        }
        
    },
    graphiql:true
    
})
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bexpert-nk7xf.mongodb.net/GraphqlTest`,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{
    app.listen(3000,(err,result)=>{
        if(err){
            console.log('node is unable to start');
        }
        else{
            console.log('node is running at 3000');
        }
    });
}).catch(()=>{
    console.log("server not started moongoose error")
})

