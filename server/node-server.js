
let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let cors = require('cors')


let whitelist = ['http://localhost:8080', 'http://localhost:8081', 'https://86a45b82.ngrok.io']
let corsOptions = {
  origin: function (origin, callback) {
    // console.log('origin1111111', origin)
    // if (whitelist.indexOf(origin) !== -1 || !origin) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
    callback(null, true)
  }
}

app.use(cors(corsOptions))
 
app.get('/userinfo', function(request, response){
  // 输出 JSON 格式
   data = {
       'first_name':'pi',
       'last_name':'yafang'
   };
  //  response.end(JSON.stringify(data))
   response.json(data)
});
 
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.post('/post', urlencodedParser, function(request, response){
  // 输出 JSON 格式
   data = {
       'name': request.body.name,
       'gender': 'girl'
   };
   console.log(data)
//    response.header("Access-Control-Allow-Origin", "*")
  //  response.end(JSON.stringify(data));
   response.json(data)
});
 
app.get('/', function(request, response){
  var hostName = request.hostname
  console.log("hostName: %s", hostName)
  response.send("I got you!")
})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("address: %s, port: %d", host, port)
})  

