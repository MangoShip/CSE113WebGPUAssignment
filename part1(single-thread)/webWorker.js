// Perform computation when receive data from main.js
self.onmessage = function(event) {
    
    // Unpack data received from main.js
    var NUMPARTICLES = event.data.NUMPARTICLES;
    var particlesData = new Float32Array(event.data.particlesBuffer);

    for (let i = 0; i < NUMPARTICLES; i++) {
        
        /* ADD YOUR COMPUTATION HERE
        *
        *
        * 
        * 
        * 
        * 
        * 
        * 
        */
        
        // Example Computation (DELETE THIS)
        particlesData[2 * i] = particlesData[2 * i] + (Math.random() * 2 - 1)
        particlesData[2 * i + 1] = particlesData[2 * i + 1] + (Math.random() * 2 - 1)
  
    }
    
    // Send back new data back to main.js
    postMessage(null);
}