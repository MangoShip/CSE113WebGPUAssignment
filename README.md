# Instruction

1. Download the latest version of [Node.js](https://nodejs.org/en/download/)

2. Use [Google Chrome Canary](https://www.google.com/chrome/canary/). After launching Chrome Canary, navigate to `chrome://flags` and enable "Unsafe WebGPU".
 
3. Launch local server 

   1. Type `npm install -g local-web-server` in terminal while being in project directory
   2. Type `ws` to launch a local server
   3. Navigate to `http://localhost:8000` (Part 1, 2), `http://localhost:8000/dist/` (Part 3) in Chrome 

# Compiling & Seeing change

## Part 1 & 2

Once you make any change to code, simply save the file and refresh the web broswer to see the change.

## Part 3

Once you make any change to code, save the file and open another terminal.
After navigating to project directory on terminal, type `npm run dev`. 
The message should display that webpack has been compiled successfully.
Then, refresh the web broswer to see the change. 

# Debugging

Pressing F12 on your keyboard will open console menu. 
Using `console.log()` function to print out to the console menu.
