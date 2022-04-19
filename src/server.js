const path = require("path")
const axios = require('axios')
const http = require('http')
const express = require('express')
const app = express()

// Access Origin
app.use(function(req, res, next) {

    const allowedOrigins = ['http://localhost:4600'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")    
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next()
})
app.disable('x-powered-by')

// Public Static File Folder
let public_folder = path.join(__dirname, '..', '/public/')
app.use(express.static(public_folder))

app.use(express.json())

const server = http.createServer(app)

// Enviroment Data
const dotenv = require('dotenv')
dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 4600
const MODEL_URL = process.env.MODEL_URL
const BEARER_TOKEN = process.env.BEARER_TOKEN

/**
 * ------------------------------
 * API Routes
 * ------------------------------
 */

// Dasboard HTML Page
app.get("/", async (req, res) => {    
    res.setHeader('Content-Type', 'text/html')
    res.status(200).sendFile(`index.html`)
})

// Return some data
app.post("/text", async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    let jsonData = req.body
    let txt = jsonData.keywords

    console.log(txt)

    let txt_ai = await getAIText(txt)

    res.status(200).send(txt_ai)
})

const getAIText = async (_txt) => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/plain' },
        data: JSON.stringify(_txt),
        Authorization: `Bearer ${BEARER_TOKEN}`
    }
    const response = await axios(MODEL_URL, options);

    let txt_ai = (response.data[0].generated_text + "").replace(/(?:\r\n|\r|\n)/g, '.')
    // console.log(response)
    // console.log(txt_ai)
    return txt_ai;
}

/**
 * ------------------------------
 * Server Settings
 * ------------------------------
 */
 server.listen(SERVER_PORT, () => {
    console.log("-------------------------------")
    console.log("  API started")
    console.log("----------------+--------------")
    console.log(`| SERVER PORT...:`, SERVER_PORT)
    console.log("----------------+--------------\n")
})