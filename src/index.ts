import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const a = 4
    if (a > 5) {
        res.send('> 5')
    } else {
        res.send('NOT > 5')

    }
})

app.get('/about', (req, res) => {
    res.send('About get')
})
app.post('/about', (req, res) => {
    res.send('About post')
})

app.listen(port, () => {
    console.log(`App start on port ${port}`)
})