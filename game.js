const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const screen_width = 400;
const screen_height = 600;

canvas.width = screen_width;
canvas.height = screen_height;

let player_position = [180, screen_height - 50];
let player_velocity = [0, 0];
let platforms = [];

let game_over = false;

function draw_game() {
  ctx.clearRect(0, 0, screen_width, screen_height);

  ctx.fillStyle = "black";
  ctx.fillRect(player_position[0], player_position[1], 30, 30);

  ctx.fillStyle = "black";
  for (const platform of platforms) {
    ctx.fillRect(platform[0], platform[1], 60, 10);
  }

  if (game_over) {
    ctx.fillStyle = "black";
    ctx.font = "36px sans-serif";
    ctx.fillText("Game Over! Press 'R' to restart", screen_width / 2, screen_height / 2);
  }
}

// ... Hier kommen deine Funktionen check_collision und main ...

draw_game();
