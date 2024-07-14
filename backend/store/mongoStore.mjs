import ConnectMongoDBSession from 'connect-mongodb-session';
import dotenv from 'dotenv';
dotenv.config();

const storeDB=(session)=>{
    const MongoDBStore=new ConnectMongoDBSession(session);
    const store=new MongoDBStore({
        uri:process.env.MONGOURL,
        collection:'session'

    })
    store.on('error',function(error){
        console.log(error);
    })
    return store;

}
export default storeDB;

