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
  pool
    .query(
      "select * from competitors where current_competitor=true order by id"
    )
    .then(result => {
      io.emit("get-current-players", result.rows);
    });
});

let scoreArray = [];
let playerArray = []; 
let currentPlayer = {};

io.on("connection", socket => {
  socket.on("new-player", (newplayer, nextplayer) => {
    playerArray = [];
    
    let gameover = false;
    io.emit("game-over", gameover);

    let standBy = false;
    io.emit("stand-by", standBy);

    let playerQueue = true;
    io.emit("player-queue", playerQueue);
    
  
    scoreArray.push({
      id: newplayer.id,
      name: newplayer.name,
      current_competitor: newplayer.current_competitor,
      avg_style: 0,
      avg_skill: 0,
      avg_originality: 0,
      avg_effort: 0,
      total: 0,
      overall_avg: 0,
      avatar: newplayer.avatar
    });
    io.emit("new-player", newplayer, nextplayer);
    
    //io.emit("next-player", nextplayer);
      
    io.emit("post-scores", scoreArray);
  });

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

    let avg_style = tot_style / playerArray.length;
    let avg_skill = tot_skill / playerArray.length;
    let avg_originality = tot_originality / playerArray.length;
    let avg_effort = tot_effort / playerArray.length;
    let overall_avg =
      (avg_style + avg_skill + avg_originality + avg_effort) / 4;

    pool
      .query(
        "update competitors set avg_style=$1::real, avg_originality=$2::real, avg_effort=$3::real, avg_skill=$4::real, overall_avg=$5::real where id=$6::int",
        [
          Math.round(avg_style * 100) / 100,
          Math.round(avg_originality * 100) / 100,
          Math.round(avg_effort * 100) / 100,
          Math.round(avg_skill * 100) / 100,
          Math.round(overall_avg * 100) / 100,
          id
        ]
      )
      .then(() => {
        pool
          .query(`select * from competitors where id = ${id}`)
          .then(result => {
            let index = scoreArray.length - 1;

            scoreArray.splice(index, 1, result.rows[0]);

            
            io.emit("post-scores", scoreArray);
          });
      });

    io.emit("player-scores", currentPlayer);
  });

  // socket.on("total-scores", message => {
  //   io.emit("total-scores", message);
  // });

  socket.on("new-competitor", (newCompetitor, avatar) => {
    let nameSubmited = true;
    io.emit("name-submit", nameSubmited);

    pool
      .query(
        "insert into competitors (name, current_competitor, avatar) VALUES ($1::text, $2::boolean, $3::text)",
        [newCompetitor, true, avatar]
      )
      .then(() => {
        pool
          .query(
            "select * from competitors where current_competitor=true order by id"
          )
          .then(result => {
            io.emit("get-current-players", result.rows);
          });
      });
  });
});

io.on("connection", socket => {
  socket.on("all-scores", message => {
    io.emit("all-scores", message);
  });
});


io.on("connection", socket => {
  socket.on("game-over", message => {
    pool.query("update competitors set current_competitor=$1::boolean", [true]).then(() => {
      function sortScores(a, b){
      
        return b.overall_avg - a.overall_avg;
      }
  
      let totalScoreArray = scoreArray.sort(sortScores);

      io.emit("total-scores", totalScoreArray);

      // console.log("JSON", JSON.stringify(totalScoreArray));
    pool
      .query(
        "update game set scores=$1::json where id=1",
        [
          JSON.stringify(totalScoreArray)
        ]
      ).then(() => {
        pool 
        .query(
          "select * from game"
          
        )
        .then(result => {
          result.rows[0].scores;

          io.emit("final-scores", result.rows[0].scores);
        });
      })

      

    totalScoreArray = [];
    scoreArray = [];
    playerArray = [];

    io.emit("post-scores", scoreArray);
    
    let gameover = true;
    io.emit("game-over", gameover);

    });  

    let playerQueue = false;
    io.emit("player-queue", playerQueue);
    let nameSubmited = false;
    io.emit("name-submit", nameSubmited);

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
