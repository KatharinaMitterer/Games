import pygame
import random
import sys

# Initialize pygame
pygame.init()

# Set up display
screen_width = 400
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Game")

# Define colors
white = (255, 255, 255)
black = (0, 0, 0)

# Load fonts
font = pygame.font.Font(None, 36)

def draw_game(player_position, platforms, game_over):
    screen.fill(white)

    pygame.draw.rect(screen, black, (player_position[0], player_position[1], 30, 30))

    for platform in platforms:
        pygame.draw.rect(screen, black, (platform[0], platform[1], 60, 10))

    if game_over:
        text = font.render("Game Over! Press 'R' to restart", True, black)
        text_rect = text.get_rect(center=(screen_width // 2, screen_height // 2))
        screen.blit(text, text_rect)

    pygame.display.update()

def check_collision(player_position, platforms):
    for platform in platforms:
        if (player_position[0] + 30 >= platform[0] and player_position[0] <= platform[0] + 60) and \
           (player_position[1] + 30 >= platform[1] and player_position[1] <= platform[1] + 10):
            return True
    return False

def main():
    player_position = [180, screen_height - 50]
    player_velocity = [0, 0]
    platforms = [(random.randint(0, screen_width - 60), random.randint(0, screen_height - 20)) for _ in range(10)]

    game_over = False

    clock = pygame.time.Clock()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_r and game_over:
                game_over = False
                player_position = [180, screen_height - 50]
                platforms = [(random.randint(0, screen_width - 60), random.randint(0, screen_height - 20)) for _ in range(10)]

        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            player_velocity[0] = -5
        elif keys[pygame.K_RIGHT]:
            player_velocity[0] = 5
        else:
            player_velocity[0] = 0

        # Update player position
        player_position[0] += player_velocity[0]
        player_position[1] += player_velocity[1]

        if player_position[1] > screen_height or check_collision(player_position, platforms):
            game_over = True

        if game_over:
            draw_game(player_position, platforms, True)
        else:
            # Update platforms
            for i in range(len(platforms)):
                platforms[i] = (platforms[i][0], platforms[i][1] + 5)
                if platforms[i][1] > screen_height:
                    platforms[i] = (random.randint(0, screen_width - 60), 0)

            draw_game(player_position, platforms, False)

        clock.tick(30)

if __name__ == "__main__":
    main()



