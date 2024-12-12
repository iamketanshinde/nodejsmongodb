const PORT = 4000;
const app = express();

const userRoutes = require("./routes/user");
const {connectMongooDb} = require('./connection');

const {logReqRes} = require("./middleware")
connectMongooDb('mongodb://127.0.0.1:27017/MongoDb-local-host')


app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));


app.use("./user",userRoutes)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
