// Select the canvas element to utilize the Canvas API in JS to draw 2D graphics 
const canvas = document.getElementById("animation-canvas");
// Use getContext() Canvas API method to generate an object representing a rendering context (where we draw the graphics)
// Has multiple contextType options, in this case 2d is all we need to draw 2d sprites
const ctx = canvas.getContext('2d');

// Global Variables
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// Simple commands for visualizing the canvas
// ctx.fillStyle = "green";
// ctx.fillRect(0,0, canvasWidth, canvasHeight);

// Create an HTML Image element to modify in order to draw animations
const animatedImage = new Image();
// Set src of <img> to our sprite asset
animatedImage.src = "assets/shadow_dog.png"
// Sprite Width and Height determined by dividing the width of sprite sheet by number of columns and height by number of rows 
const spriteWidth = 575;
const spriteHeight = 523;

// Initialize frame x and y variables to 0 to start animation at the first sprite in our sprite sheet, change accordingly to animate (X) and swap to new animations (y)
let frameX = 0;
let frameY = 3;

// Initialize game frame and delay frame variables to slow down the animation frames
let gameFrame = 0;
let delayFrames = 5; // Adjust this value to change speed of animation frames

// Animation Loop
function animate() {
    // Clear graphics from previous frame to update
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // s variables => x, y, width, and height in regard to source img | d variables => x, y, width, and height of image on destination canvas
    // Use s variables to cut out chunks of a sprite sheet, changes chunks each frame
    // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(animatedImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 
    0, 0, spriteWidth, spriteHeight);
    
    // Skip a frame if the game frame is divisible by the delayFrames value
    if(gameFrame % delayFrames == 0) {
        if(frameX < 6) frameX++;
        else frameX = 0;
    }

    // Continously increment to trigger frame skips
    gameFrame++; 

    // Causes the animation to loop by continuously requesting the next frame with animate() as the frame provider
    requestAnimationFrame(animate);
}

animate();