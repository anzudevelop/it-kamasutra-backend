const http = require('http')

let requestCount = 0

const server = http.createServer((request, response) => {

    switch (request.url) {
        case '/students':
            response.write('STUDENTS')
            break
        case '/':
        case '/courses':
            response.write('COURSES')
            break
        default:
            response.write('404 not found')

    }
    requestCount++
    response.write(' requests: ' + requestCount)
    response.end()
})

server.listen(3003)