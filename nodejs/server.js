const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;                             //3001번 포트 사용
//const route = require(`./route/index`);

var http = require("http").createServer(app);  //모듈사용
const io = require("socket.io")(http, { cors: { origin: "*" } });     //socket.io 모듈 및 cors

app.use(bodyParser.json());

app.use(cors());
//app.use("/", route);
app.get('/', function(req, res){
    res.send('main');
});

io.on("connection", function (socket) {
  console.log("소켓 접속 완료");

  socket.on("roomjoin", (userid) => {  //roomjoin 이벤트명으로 데이터받기 //socket.on
    console.log(userid);
    socket.join(userid);               //userid로 방 만들기
    var returnData = userid + '님이 입장하셨습니다.';
    io.to(userid).emit('clientReceive', returnData);          //io(방아이디).emit(이벤트명, 데이터 )
  });

  socket.on("alert", (data) => {  //alet 이벤트로 데이터 받기 
    console.log(data.room);
    console.log(data.message);
    io.to(data.room).emit("heejewake", data);  //touserid: 클라이언트1이 보낸데이터"hwi"
  });                                             //heejewake이벤트: hwi 에게 메시지 hwi를 보낸다
});                                              

http.listen(port, () => {
  console.log(`express is running on ${port}`);
});