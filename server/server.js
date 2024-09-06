const express = require("express")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan= require("morgan")
const cors = require("cors")

const routes = require("./routes/routes")
const { dbConnect } = require("./dbConnect/index")


const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(helmet())
app.use(morgan("common"))

app.listen(5000, () => {
    console.log(`server listening on port 5000`);
    dbConnect()
})
