const Redis = require("ioredis")
const redis = new Redis({
    sentinels: [
        { host: "redis-sentinel1", port: 26380 },
        { host: "redis-sentinel2", port: 26381 },
        { host: "redis-sentinel3", port: 26382 },
    ],
    name: "mymaster",
    // sentinelPassword: "secret"
});

// const redis = new Redis(6381);

const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    res.send("hello world")
});

app.get('/get', async (req, res) => {
    const { key } = req.query
    const value = await redis.get(key)
    res.send(value)
});

app.get('/set', async (req, res) => {
    const { key, value } = req.query
    await redis.set(key, value)
    res.send('Ok')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})