// Perform computation when receive data from main.js
self.onmessage = function(event) {
    
    // Unpack data received from main.js
    var particlesComputeData = new Float32Array(event.data.particlesComputeBuffer);
    var particlesRenderData = new Float32Array(event.data.particlesRenderBuffer);
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
        particlesRenderData[2 * i] = particlesComputeData[2 * i] + (Math.random() * 2 - 1)
        particlesRenderData[2 * i + 1] = particlesComputeData[2 * i + 1] + (Math.random() * 2 - 1)
  
    }
    
    // Send back new data back to main.js
    postMessage(null);
}