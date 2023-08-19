// Initialize canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const screen_width = 400;
const screen_height = 600;

canvas.width = screen_width;
canvas.height = screen_height;

// Define colors
const white = "#FFFFFF";
const black = "#000000";

// Load font
ctx.font = "36px sans-serif";

// Player and platforms initialization
let player_position = [180, screen_height - 50];
let player_velocity = [0, 0];
let platforms = Array.from({ length: 10 }, () => [
  Math.floor(Math.random() * (screen_width - 60)),
  Math.floor(Math.random() * (screen_height - 20)),
]);

let game_over = false;

function draw_game() {
  ctx.clearRect(0, 0, screen_width, screen_height);

  ctx.fillStyle = black;
  ctx.fillRect(player_position[0], player_position[1], 30, 30);

  ctx.fillStyle = black;
  for (const platform of platforms) {
    ctx.fillRect(platform[0], platform[1], 60, 10);
  }

  if (game_over) {
    ctx.fillStyle = black;
    ctx.fillText(
      "Game Over! Press 'R' to restart",
      screen_width / 2,
      screen_height / 2
    );
  }
}

function check_collision(player_position, platforms) {
  for (const platform of platforms) {
    if (
      player_position[0] + 30 >= platform[0] &&
      player_position[0] <= platform[0] + 60 &&
      player_position[1] + 30 >= platform[1] &&
      player_position[1] <= platform[1] + 10
    ) {
      return true;
    }
  }
  return false;
}

function main() {
  const keys = {};

  document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
  });

  document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
  });

  const clock = setInterval(() => {
    ctx.clearRect(0, 0, screen_width, screen_height);

    if (keys["ArrowLeft"]) {
      player_velocity[0] = -5;
    } else if (keys["ArrowRight"]) {
      player_velocity[0] = 5;
    } else {
      player_velocity[0] = 0;
    }

    // Update player position
    player_position[0] += player_velocity[0];
    player_position[1] += player_velocity[1];

    if (player_position[1] > screen_height || check_collision(player_position, platforms)) {
      game_over = true;
    }

    if (game_over) {
      ctx.fillStyle = black;
      ctx.fillText(
        "Game Over! Press 'R' to restart",
        screen_width / 2,
        screen_height / 2
      );
    } else {
      // Update platforms
      for (let i = 0; i < platforms.length; i++) {
        platforms[i][1] += 5;
        if (platforms[i][1
