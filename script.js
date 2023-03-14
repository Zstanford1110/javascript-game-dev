// Select the canvas element to utilize the Canvas API in JS to draw 2D graphics 
const canvas = document.getElementById("animation-canvas");
// Use getContext() Canvas API method to generate an object representing a rendering context (where we draw the graphics)
// Has multiple contextType options, in this case 2d is all we need to draw 2d sprites
const ctx = canvas.getContext('2d');

// Global Variables
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// Create an HTML Image element to modify in order to draw animations
const animatedImage = new Image();
// Set src of <img> to our sprite asset
animatedImage.src = "assets/shadow_dog.png"
// Sprite Width and Height determined by dividing the width of sprite sheet by number of columns and height by number of rows 
const spriteWidth = 575;
const spriteHeight = 523;
let playerState = 'idle'; // Start default animation at idle



// Initialize game frame and delay frame variables to slow down the animation frames
let gameFrame = 0;
let delayFrames = 5; // Adjust this value to change speed of animation frames

// System for generating x and y positions of animation frames on the sprite sheet
const spriteAnimations = [];
// Establish animation states based on user-picked name and the number of frames in the animation
const animationStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'land',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'stunned',
        frames: 11
    },
    {
        name: 'crouch',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'attack',
        frames: 7
    },
    {
        name: 'knockdown',
        frames: 12
    },
    {
        name: 'hit',
        frames: 4
    }
];

// Use animation states to generate the spriteAnimations data structure (skips a lot of manual calculations)
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    // For this particular animation state, loop through all possible frames and generate x and y coordinates
    for (let i = 0; i < state.frames; i++) {

        let position = {
            x: spriteWidth * i, // x starting position of sprite will change based on current animation frame
            y: spriteHeight * index, // y starting position will remain constant based on current animation state
        }

        frames.loc.push(position); // Add position to our object (will store all x and y positions for an animation)
    }

    spriteAnimations[state.name] = frames;

})

// Dynamically add animation options to our HTML select element for user to select different animations
const controllerDropdown = document.getElementById('controller');
animationStates.forEach((state) => {
    let newOption = new Option(state.name, state.name);
    controllerDropdown.add(newOption, undefined);
})




// Animation Loop
function animate() {

    // Change animation based on selected input
    controllerDropdown.onchange = (ev) => {
        playerState = controllerDropdown.value;
    }

    // Clear graphics from previous frame to update
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Advanced animation technique
    let position = Math.floor(gameFrame / delayFrames) % spriteAnimations[playerState].loc.length;  // Using floor of gameFrame / delayFrames will produce the next whole integer once gameFrames is evenly divisible by delayFrames, modulus by number of possible frames in animation causes frame changes
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;

    // s variables => x, y, width, and height in regard to source img | d variables => x, y, width, and height of image on destination canvas
    // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(animatedImage, frameX, frameY, spriteWidth, spriteHeight,
        0, 0, spriteWidth, spriteHeight);


    // Continously increment to trigger animation delays
    gameFrame++;

    // Causes the animation to loop by continuously requesting the next frame with animate() as the frame provider
    requestAnimationFrame(animate);
}

animate();





// <======= OLD CODE FOR REFERENCE: =======>


// Simple commands for visualizing the canvas
    // ctx.fillStyle = "green";
    // ctx.fillRect(0,0, canvasWidth, canvasHeight);

// Original Frame Variables to move through sprite sheet
    // Initialize frame x and y variables to 0 to start animation at the first sprite in our sprite sheet, change accordingly to animate (X) and swap to new animations (y)
    // let frameX = 0;
    // let frameY = 4;

// Original Frame Staggering
    // Skip a frame if the game frame is divisible by the delayFrames value
    // if(gameFrame % delayFrames == 0) {
    //     if(frameX < 6) frameX++;
    //     else frameX = 0;
    // }