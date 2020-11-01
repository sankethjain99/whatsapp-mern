import express  from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
//const Pusher = require("pusher");
import Pusher from 'pusher';
import cors from 'cors';

const app= express();
const port= process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1100191",
    key: "f7948e14785f50985c67",
    secret: "e6aa3fedd6fa392a03a6",
    cluster: "ap2",
    useTLS: true
  });

app.use(express.json())
app.use(cors())

const connection_url = 'mongodb+srv://admin:Z0TwhUltgQvPS4P6@cluster0.defsm.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.once('open', () => {
    console.log('DB Connected')

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change)=>{
        console.log(change)
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name: messageDetails.name,
                message:messageDetails.message,
                timestamp: messageDetails.timestamp,
                received:false,
            }
        );

    }else{
        console.log('Error Triggering Pusher');
    }
    })
})
app.get('/',(req,res)=> res.status(200).send('hello World'))

app.get('/messages/sync', (req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.listen(port,() =>console.log(`Listening on localhost:${port}`))