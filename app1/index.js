let playerName = "";

document.getElementById("save-btn").addEventListener("click", () => {
    playerName = document.getElementById("name").value;
    fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName }),
    })
    .then(response => response.json())
    .then(data => console.log("Jugador registrado", data))
    .catch(error => console.error("Error:", error));
});

document.querySelectorAll(".play-btn").forEach(button => {
    button.addEventListener("click", () => {
        if (!playerName) {
            alert("Ingresa tu nombre primero.");
            return;
        }

        const choice = button.getAttribute("data-choice");
        fetch("/play", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: playerName, choice }),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("message").innerText = data.winner
                ? `Resultado: ${data.winner}`
                : data.message;
        })
        .catch(error => console.error("Error:", error));
    });
});
