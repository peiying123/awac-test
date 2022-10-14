const http = require("http")

const server = http.createServer((req,res)=>{
    console.log("訪客請求已經收到")

    console.log(req.url)
    console.log(req.method)

    res.setHeader('Content-Type','text/html')
    res.write('<meta charset="UTF-8">')
    res.write('<h1>hello</h1>')
    res.end()
})
server.listen(3000,'localhost',()=>{
    console.log("伺服器已經在聆聽第3000號port")
})