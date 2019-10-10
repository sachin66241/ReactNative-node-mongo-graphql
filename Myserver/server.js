const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();
app.use(bodyParser.json());



app.use('/api',graphqlHttp({
    schema: buildSchema(`

    type Event{
        _id:ID
        name:String
        password:String

    }
    type RootQuery {
        events:[Event!]!
    }

    input eventInput{
        name:String
        password:String

    }

    type RootMutation{
        createEvent(eventinput: eventInput):Event
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
                password:args.eventinput.password
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

