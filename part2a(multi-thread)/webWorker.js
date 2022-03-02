// Perform computation when receive data from main.js
self.onmessage = function(event) {
    
    // Unpack data received from main.js
    var particlesData = new Float32Array(event.data.particlesBuffer);
    var startIndex = event.data.startIndex;
    var endIndex = event.data.endIndex;

    for (let i = startIndex; i < endIndex; i++) {
        
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