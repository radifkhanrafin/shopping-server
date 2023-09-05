const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


// const uri = "mongodb+srv://meherafkabir:WbI5ZopdhMYpFC6d@ema-jhon-online-shop.6slzhgr.mongodb.net";
const uri = "mongodb+srv://meherafkabir:WbI5ZopdhMYpFC6d@ema-jhon-online-shop.6slzhgr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // const userscollection = client.db("doctors_data").collection("users");
        const ProductCollection = client.db("EmaJhondb").collection("emaJhonProducts")
        const CartCollection = client.db("EmaJhondb").collection("cartProducts")


        // EmaJhondb
        // emaJhonProducts
        app.get('/all-Products', async (req, res) => {
            const allProducts = await ProductCollection.find().toArray();
            res.send(allProducts)
        })
        app.post('/cart', async (req, res) => {
            const product = req.body;
            console.log(product)
            const cartProduct = await CartCollection.insertOne(product);
            res.send(cartProduct)
        })
        app.get('/cart-Products', async (req, res) => {
            const allProducts = await CartCollection.find().toArray();
            res.send(allProducts)
        })
        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: new ObjectId(id) }
            const deleteProduct = await CartCollection.deleteOne(query);
            res.send(deleteProduct)
        })
    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("All Product's Data Is Here")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})