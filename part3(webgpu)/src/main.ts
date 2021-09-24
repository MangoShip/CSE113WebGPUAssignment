/*
*   CSE 113 Assignment X Part 3
*   Web Worker (WebGPU)
*/

import spriteWGSL from './sprite.wgsl';
import updateSpriteWGSL from './updateSprite.wgsl';

export const main = async() => {
    
    // Number of particles
    const NUMPARTICLES = 1500;
    
    // Set up canvas and other devices
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const adapter = await navigator.gpu.requestAdapter() as GPUAdapter;       
    const device = await adapter.requestDevice() as GPUDevice;

    const context = canvas.getContext('webgpu');
    const format = 'bgra8unorm';

    context.configure({
        device: device,
        format: format,
    });

    // Read from sprite.wgsl and create a pipeline for rendering
    const spriteShaderModule = device.createShaderModule({ code: spriteWGSL });
    const renderPipeline = device.createRenderPipeline({
        vertex: {
            module: spriteShaderModule,
            entryPoint: 'vert_main',
        },
        fragment: {
            module: spriteShaderModule,
            entryPoint: 'frag_main',
            targets: [
              {
                format: format as GPUTextureFormat
              },
            ],
        },
        primitive: { // Chooses which type of shape 
            topology: 'point-list'
        },
    })

    // Read from updateSprite.wgsl and create a pipeline for computing
    const computePipeline = device.createComputePipeline({
        compute: {
            module: device.createShaderModule({
                code: updateSpriteWGSL,
            }),
            entryPoint: 'main',
        }
    })

    // Create an array to store each particles' position value
    const particlesData = new Float32Array(NUMPARTICLES * 2);
    
    // Go through all particles then declare their initial position in canvas
    for (let i = 0; i < NUMPARTICLES; ++i) {
        // Get random position of each particle
        // Values are between -1 to 1
        particlesData[2 * i] = 2 * (Math.random() - 0.5); // X position
        particlesData[2 * i + 1] = 2 * (Math.random() - 0.5); // Y position
    }

    // Create a buffer for particles 
    const particleBuffers: GPUBuffer[] = new Array(2);
    const particleBindGroups: GPUBindGroup[] = new Array(2);
    for (let i = 0; i < 2; i++) {
        particleBuffers[i] = device.createBuffer({
            size: particlesData.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
            mappedAtCreation: true,
        });
        new Float32Array(particleBuffers[i].getMappedRange()).set(
            particlesData
        );
        particleBuffers[i].unmap();
    }

    // Assign bind group to computePipeline
    for (let i = 0; i < 2; i++) {
        particleBindGroups[i] = device.createBindGroup({
            layout: computePipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: particleBuffers[i],
                        offset: 0,
                        size: particlesData.byteLength
                    }
                }
            ]
        });
    }

    const vertexBufferData = new Float32Array([
        0.0, 0.0
    ]);

    const spriteVertexBuffer = device.createBuffer({
        size: vertexBufferData.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
    });
    new Float32Array(spriteVertexBuffer.getMappedRange()).set(vertexBufferData);
    spriteVertexBuffer.unmap();

    // Variables for performance measurement (fps)
    var updatePerformance = true;
    var currentTime, previousTime;
    currentTime = previousTime = performance.now();
    var totalFramePerSecond = 0;
    var frameCounter = 0;

    let t = 0;
    function frame() {

        const textureView = context.getCurrentTexture().createView();
        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [
                {
                    view: textureView,
                    loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }, //background color
                    storeOp: 'store'
                }
            ]
        }
            
        const commandEncoder = device.createCommandEncoder();
        {
            // Computation
            const passEncoder = commandEncoder.beginComputePass();
            passEncoder.setPipeline(computePipeline);
            passEncoder.setBindGroup(0, particleBindGroups[t % 2]);
            passEncoder.dispatch(Math.ceil(NUMPARTICLES / 64));
            passEncoder.endPass();
        }
        {
            // Rendering
            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
            passEncoder.setPipeline(renderPipeline);
            passEncoder.setVertexBuffer(0, particleBuffers[(t+1)%2]);
            passEncoder.setVertexBuffer(1, spriteVertexBuffer);
            passEncoder.draw(1, NUMPARTICLES, 0, 0);
            passEncoder.endPass();      
        }
        // Finished rendering
        device.queue.submit([commandEncoder.finish()]); 
        ++t;
        
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

            document.getElementById("fps")!.innerHTML = `FPS:  ${averageFramePerSecond}`;

            setTimeout(() => {
                updatePerformance = true;
            }, 50); // update FPS every 50ms
        }

        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}
main();