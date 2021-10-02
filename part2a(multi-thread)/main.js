/*
*   CSE 113 Assignment X Part 2a
*   Web Worker (Multi-Thread)
*   This part initialize Web Workers every frame
*/
function main() {
    
    // Number of particles
    const NUMPARTICLES = 150;

    // Number of workers
    const NUMWORKERS = 4;
    
    // Get canvas and context 
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");

    // Draw canvas background
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create a buffer for allowing shared memory
    var particlesBuffer = new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * (NUMPARTICLES * 2));

    // Create an array to store each particles' position value
    var particlesData = new Float32Array(particlesBuffer);

    // Go through all particles then declare their initial position in canvas
    for (let i = 0; i < NUMPARTICLES; i++) {
        // Get random position of each particle
        particlesData[2 * i] = Math.random() * canvas.width; // X position
        particlesData[2 * i + 1] = Math.random() * canvas.height; // Y position

        // Draw a particle into canvas
        context.fillStyle = "white";
        context.fillRect(particlesData[2 * i], particlesData[2 * i + 1], 1, 1);
    }

    // Variables for performance measurement (fps)
    var updatePerformance = true;
    var currentTime, previousTime;
    currentTime = previousTime = performance.now();
    var totalFramePerSecond = 0;
    var frameCounter = 0;

    // Update Particles
    function frame() {

        var numWorkerFinished = 0;

        // Create a worker list
        var workerList = [];

        // Initialize workers
        for (let j = 0; j < NUMWORKERS; ++j) {
            var worker = new Worker('./webWorker.js');
            workerList[j] = worker;
        }

        // Assign work to each worker 
        for (let i = 0; i < NUMWORKERS; ++i) {

            var chunk_size = Math.floor((+NUMPARTICLES + (+NUMWORKERS - 1)) / +NUMWORKERS)
            var startIndex = chunk_size * i;
            var endIndex = Math.min(startIndex + chunk_size, +NUMPARTICLES);

            // Gather all data together that will get send over to worker
            var transferData = {
                NUMPARTICLES: NUMPARTICLES,
                particlesBuffer: particlesBuffer,
                startIndex: startIndex,
                endIndex: endIndex
            }

            // Send work to a web worker
            workerList[i].postMessage(transferData);

            workerList[i].onmessage = function(event) {
                numWorkerFinished++;

                // Check if all workers have finished with computation
                if(numWorkerFinished == NUMWORKERS) {
                    // Erase all particles
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw canvas background
                    context.fillStyle = "black";
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw particles with new data into canvas
                    for (let i = 0; i < NUMPARTICLES; i++) {
                        context.fillStyle = "white";
                        context.fillRect(particlesData[2 * i], particlesData[2 * i + 1], 1, 1);
                    }

                    // Measure performance
                    currentTime = performance.now();
                    var elapsedTime = currentTime - previousTime;
                    previousTime = currentTime;
                    var framePerSecond = Math.round(1 / (elapsedTime / 1000));
                    totalFramePerSecond += framePerSecond;
                    frameCounter++;

                    if(updatePerformance) {
                        updatePerformance = false;

                        let averageFramePerSecond = Math.round(totalFramePerSecond / frameCounter);
                        
                        frameCounter = 0;
                        totalFramePerSecond = 0;

                        document.getElementById("fps").innerHTML = `FPS:  ${averageFramePerSecond}`;

                        // Update FPS every 50ms
                        setTimeout(() => {
                            updatePerformance = true;
                        }, 50);
                    }
                    requestAnimationFrame(frame);
                }
            }
        }
    }
    requestAnimationFrame(frame);
}
main();