var fs = require('fs');
eval(fs.readFileSync('regex.js')+'');
var $ = require('jquery')
let { PythonShell } = require('python-shell')
const puppeteer = require('puppeteer');
var userAgent = require('user-agents');
let pyshell = new PythonShell('process.py', { mode: 'text'});
const Captcha = require("2captcha")
const solver = new Captcha.Solver("fd973980306f70d1904a054bb0dd4e80")
// A new 'solver' instance with our API key

const express = require('express')
const app = express()

app.set('view engine','ejs')
app.set('views','page')
const request = require('request')

app.use((req,res,next)=>{
    console.log(`有新訪客:來自${req.hostname}|請求頁面 ${req.path}`)
    next()
})

app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public/'));


app.get('/',(req,res)=>{

    res.render('test')
})
var ip=['141.95.54.20','47.241.245.186','80.48.119.28','47.91.44.217']

var a,b,url
var dataa={
    url:"0"
}
var url = 'https://www.ncyu.edu.tw/newsite/index.aspx'
app.post('/',(req,res)=>{

    (async () => {

        
        const browser = await puppeteer.launch({
            headless: true
            //false 會讓瀏覽器實際開啟
            //true 會再後台開啟
        });
        
        const page = await browser.newPage();
        var cookie={name: 'over18',value: '1'}
  
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');
        await page.goto(req.body.username);
        let body = await page.content()
        await page.setCookie(cookie);

        await page.goto(req.body.username);
        if(await page.content()>body)
            body = await page.content()
        
        a=JSON.stringify(parse_html(body))
     
        await browser.close()
    })();
    function redirect_node() {
        res.redirect("/node_test")
      }
    setTimeout(redirect_node,8000)
})


app.get('/node_test',(req,res)=>{

    res.render("datagrid",{url:url,data:JSON.parse(a)})
})

app.post('/node_test',(req,res)=>{

    b=req.body.array  
    res.redirect("/datagrid_final")
    
})
app.post('/datagrid_final',(req,res)=>{

    b=req.body.array  
    res.redirect("/datagrid_final")
    
})
app.get('/datagrid_final',(req,res)=>{

    const data = b
    res.render("datagrid_final",{url:url,data:JSON.parse(b)})
})

app.listen(process.env.PORT ||3000)