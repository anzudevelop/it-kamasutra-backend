const http = require('http')
const fs = require('fs')

const delay = (ms) => {  //Промисификация
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
const readFile = (path) => {  //Промисификация
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) resolve(err)
            else resolve(data)
        })
    })
}

const server = http.createServer(async (request, response) => {

    switch (request.url) {
        case '/home':
            try {
                const data = await readFile('pages/home.html')
                response.write(data)
                response.end()
            } catch(err) {
                response.write('error')
                response.end()
            }
            break
        case '/about':
            await delay(3000)   // Жди 3 секунды
            response.write('about')
            response.end()
            break
        default:
            response.write('404 not found')
            response.end()
    }
})

server.listen(3003)