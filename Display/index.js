document.getElementById("update-btn").addEventListener("click", () => {
    fetch("/users")
    .then(response => response.json())
    .then(data => {
        document.getElementById("players").innerText = "Jugadores: " + data.users.join(", ");
        document.getElementById("scores").innerText = "Puntajes: " + JSON.stringify(data.scores);

        setTimeout(() => {
            users = [];
            scores = {};
            choices = {};
            console.log("Todo reiniciado después de 5 segundos");
          }, 5000);
    })
    .catch(error => console.error("Error:", error));
});
