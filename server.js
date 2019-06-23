"use strict";
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const port = process.env.PORT || 3000;
const routes = require("./routes");
const pool = require("./connection");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/api", routes);

io.on("connection", () => {
  pool.query("select * from competitors order by id").then(result => {
    io.emit("get-current-players", result.rows);
  });
});

let scoreArray = [];
let playerArray = [];

let totalScore = 0;
let averageScore = 0;
let currentPlayer = {};
let currentScores = [];

io.on("connection", socket => {

    socket.on("new-player", message => {

      scoreArray.push({id: message.id, name: message.name, current_competitor: message.current_competitor, avg_style: 0, avg_skill: 0, avg_originality: 0, avg_effort: 0, total: 0, overall_avg: 0});
  
      // scoreArray = [{id: message.id, name: message.name, current_competitor: message.current_competitor, avg_style: 0,
      // avg_skill: 0, avg_originality: 0, avg_effort: 0, total: 0, overall_avg: 0}];
      
      io.emit("new-player", message);

      console.log(scoreArray);
      
      io.emit("post-scores", scoreArray);

    });

    // socket.on("new-player", message => {

    //   console.log(message);
      
      
    //   scoreArray = [{id: message.id, name: message.name, current_competitor: message.current_competitor, avg_style: 0,
    //   avg_skill: 0, avg_originality: 0, avg_effort: 0, total: 0, overall_avg: 0}];
      
    //   io.emit("new-player", message);

    //   //console.log(scoreArray);
      
    //   io.emit("post-scores", scoreArray);

    // });
 
  socket.on("player-scores", (scores, id, name) => {
  
    playerArray.push(scores);

    let tot_style = 0;
    let tot_skill = 0;
    let tot_originality = 0;
    let tot_effort = 0;

    for (let i = 0; i < playerArray.length; i++) {
      tot_style += playerArray[i].style;
      tot_skill += playerArray[i].skill;
      tot_originality += playerArray[i].originality;
      tot_effort += playerArray[i].effort;
    }

    let avg_style = tot_style/playerArray.length;
    let avg_skill = tot_skill/playerArray.length;
    let avg_originality = tot_originality/playerArray.length;
    let avg_effort = tot_effort/playerArray.length;
    let overall_avg = (avg_style + avg_skill + avg_originality + avg_effort)/4;

    
    pool
    .query(
      "update competitors set avg_style=$1::real, avg_originality=$2::real, avg_effort=$3::real, avg_skill=$4::real, overall_avg=$5::real where id=$6::int",
      [
        Math.round(avg_style*100)/100,
        Math.round(avg_originality*100)/100,
        Math.round(avg_effort*100)/100,
        Math.round(avg_skill*100)/100,
        Math.round(overall_avg*100)/100,
        id
      ]
    )
    .then(() => {
      pool.query(`select * from competitors where id = ${id}`).then(result => {

        //console.log("after query from DB");
        //console.log(scoreArray);
        
        console.log("RESULT ROWS");
        console.log(result.rows[0]);

        console.log("SCORE ARRAY BEFORE SPLICE");
        console.log(scoreArray);


        console.log("THE ITEM WE WANT TO REPLACE");
        console.log(scoreArray[scoreArray.length - 1]);

        let index = scoreArray.length - 1;
        
        scoreArray.splice(index, 1, result.rows[0]);

        //console.log(result.rows);
        console.log("SCORE ARRAY AFTER SPLICE");
        console.log(scoreArray);
        
        

        io.emit("post-scores", scoreArray);
      });
    });
    
    

    // scoreArray = Object.values(scores);
    // currentScores.push(scoreArray);

    // loop through currentScores to get the total average...assign the average to currentPlayer
    currentPlayer = {
      id: id,
      name: name,
      avg_style: scores.style,
      avg_skill: scores.skill,
      avg_originality: scores.originality,
      avg_effort: scores.effort,
      overall_avg: averageScore,
      total: totalScore
    };


    // for (let i = 1; i < scoreArray.length; i++) {
    //   totalScore += scoreArray[i];
    // }

    //averageScore = totalScore / judgeCounter;

    // POST THE NAME + AVERAGE SCORE TO THE DATABASE
    // WHEN THAT IS DONE, GET THE UPDATED TABLE
    // SEND THE UPDATED TABLE TO THE FRONT END

    // playerScoreArray.push();

    // console.log(playerScoreArray);


    io.emit("player-scores", currentPlayer);
  });

  // if the next button is clicked...emit this event
  // socket.on("next-player", () => {
  //   pool.query("blah blah blah", [currentPlayer.skill, currentPlayer.style, ]).then(() => {
  //     pool.query("select * from scores").then((result) => {
  //       currentPlayer = {};

  //     });
  //   });
  // });



  // socket.on("total-scores", message => {
  //   io.emit("total-scores", message);
  // });

  //posting new player to DB
  socket.on("new-competitor", newCompetitor => {
    pool
      .query(
        "insert into competitors (name, current_competitor) VALUES ($1::text, $2::boolean)",
        [
          newCompetitor, 
          true
        ]
      )
      .then(() => {
        pool.query("select * from competitors").then(result => {
          io.emit("get-current-players", result.rows);
        });
      });
  });
});

//const finalScores = [];



io.on("connection", socket => {
  socket.on("all-scores", message => {
    //console.log(message);

    io.emit("all-scores", message);
  });
});

io.on("connection", socket => {
  socket.on("game-over", message => {
    io.emit("game-over", message);
  });
});

io.on("connection", socket => {
  socket.on("clear-scores", message => {
    io.emit("clear-scores", message);
  });
});

io.on("connection", socket => {
  socket.on("load-competitors", message => {
    io.emit("load-competitors", message);
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
