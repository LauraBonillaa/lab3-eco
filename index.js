const express = require("express");
const path = require("path");

const app = express();
const port = 5050;

app.use(express.json());

app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));
app.use("/display", express.static(path.join(__dirname, "display")));

let users = [];
let scores = {};
let choices = {};

app.get("/users", (req, res) => {
  res.json({ users, scores });
 
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "El nombre es requerido" });

  if (!users.includes(name)) {
    users.push(name);
    scores[name] = 0;
  }

  res.json({ users, scores });
});

app.post("/play", (req, res) => {
  const { name, choice } = req.body;

  if (!name || !choice) {
    return res.status(400).json({ error: "Nombre y elección son requeridos" });
  }

  choices[name] = choice;

  if (Object.keys(choices).length === 2) {
    const [player1, player2] = Object.keys(choices);
    const result = determineWinner(choices[player1], choices[player2]);

    if (result === "win") {
      scores[player1]++;
    } else if (result === "lose") {
      scores[player2]++;
    }

    res.json({ winner: result === "tie" ? "Empate" : result, scores });
    setTimeout(() => {
      users = [];
      scores = {};
      choices = {};
      console.log("Todo reiniciado después de 5 segundos");
    }, 60000);

  
   
  } else {
    
    res.json({ message: "Esperando al otro jugador..." });
    
   
  }
});

function determineWinner(choice1, choice2) {
  if (choice1 === choice2) return "tie";

  const rules = {
    piedra: "tijeras",
    tijeras: "papel",
    papel: "piedra",
  };

  return rules[choice1] === choice2 ? "win" : "lose";
}

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

