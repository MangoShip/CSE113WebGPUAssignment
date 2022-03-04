/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sprite.wgsl":
/*!*************************!*\
  !*** ./src/sprite.wgsl ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// Renders a particle at its position\r\n@stage(vertex)\r\nfn vert_main(@location(0) particlePos : vec2<f32>) -> @builtin(position) vec4<f32> {  \r\n    return vec4<f32>(particlePos, 0.0, 1.0);\r\n}\r\n\r\n// Determines color of each object\r\n@stage(fragment)\r\nfn frag_main() -> @location(0) vec4<f32> {\r\n    return vec4<f32>(1.0, 1.0, 1.0, 1.0);\r\n}");

/***/ }),

/***/ "./src/updateSprite.wgsl":
/*!*******************************!*\
  !*** ./src/updateSprite.wgsl ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("struct Particle {\r\n    pos : vec2<f32>;\r\n};\r\n\r\nstruct Particles {\r\n    particles : array<Particle>;\r\n};\r\n\r\n@binding(0) @group(0) var<storage, read_write> particlesA : Particles;\r\n@binding(1) @group(0) var<storage, read_write> particlesB : Particles;\r\n\r\n@stage(compute) @workgroup_size(64)\r\nfn main(@builtin(global_invocation_id) GlobalInvocationID : vec3<u32>) {\r\n    var index : u32 = GlobalInvocationID.x;\r\n\r\n    // Get position of current particle\r\n    var vPos = particlesA.particles[index].pos;\r\n\r\n    // ADD YOUR COMPUTATION HERE\r\n    //\r\n    //\r\n    //\r\n    //\r\n    //\r\n        \r\n    // Example Computation (DELETE THIS)\r\n    vPos.x = vPos.x + 0.001;\r\n    vPos.y = vPos.y + 0.001;\r\n\r\n    // Write new particle data\r\n    particlesB.particles[index].pos = vPos;\r\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _sprite_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite.wgsl */ "./src/sprite.wgsl");
/* harmony import */ var _updateSprite_wgsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateSprite.wgsl */ "./src/updateSprite.wgsl");
/*
*   CSE 113 Assignment 5 Part 3
*   WebGPU
*/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Number of particles
    const NUMPARTICLES = 1500;
    // Set up canvas and other devices
    const canvas = document.getElementById('canvas');
    const adapter = yield navigator.gpu.requestAdapter();
    const device = yield adapter.requestDevice();
    const context = canvas.getContext('webgpu');
    const format = 'bgra8unorm';
    context.configure({
        device: device,
        format: format,
    });
    // Read from sprite.wgsl and create a pipeline for rendering
    const spriteShaderModule = device.createShaderModule({ code: _sprite_wgsl__WEBPACK_IMPORTED_MODULE_0__["default"] });
    const renderPipeline = device.createRenderPipeline({
        vertex: {
            module: spriteShaderModule,
            entryPoint: 'vert_main',
            buffers: [
                {
                    arrayStride: 2 * 4,
                    attributes: [
                        {
                            shaderLocation: 0,
                            offset: 0,
                            format: 'float32x2',
                        }
                    ]
                }
            ]
        },
        fragment: {
            module: spriteShaderModule,
            entryPoint: 'frag_main',
            targets: [
                {
                    format: format
                },
            ],
        },
        primitive: {
            topology: 'point-list'
        },
    });
    // Read from updateSprite.wgsl and create a pipeline for computing
    const computePipeline = device.createComputePipeline({
        compute: {
            module: device.createShaderModule({
                code: _updateSprite_wgsl__WEBPACK_IMPORTED_MODULE_1__["default"],
            }),
            entryPoint: 'main',
        }
    });
    // Create an array to store each particles' position value
    const particlesData = new Float32Array(NUMPARTICLES * 2);
    // Go through all particles then declare their initial position in canvas
    for (let i = 0; i < NUMPARTICLES; ++i) {
        // Get random position of each particle
        // Values are between -1 to 1
        particlesData[2 * i] = 2 * (Math.random() - 0.5); // X position
        particlesData[2 * i + 1] = 2 * (Math.random() - 0.5); // Y position
    }
    // Create a buffer and bind group objects
    const particleBuffers = new Array(2);
    const particleBindGroups = new Array(2);
    // Create a buffer and map memory
    for (let i = 0; i < 2; i++) {
        particleBuffers[i] = device.createBuffer({
            size: particlesData.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
            mappedAtCreation: true,
        });
        new Float32Array(particleBuffers[i].getMappedRange()).set(particlesData);
        particleBuffers[i].unmap();
    }
    // Create a bind group
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
                },
                {
                    binding: 1,
                    resource: {
                        buffer: particleBuffers[(i + 1) % 2],
                        offset: 0,
                        size: particlesData.byteLength
                    }
                },
            ]
        });
    }
    // Variables for performance measurement (fps)
    var updatePerformance = true;
    var currentTime, previousTime;
    currentTime = previousTime = performance.now();
    var totalFramePerSecond = 0;
    var frameCounter = 0;
    let t = 0;
    function frame() {
        const textureView = context.getCurrentTexture().createView();
        const renderPassDescriptor = {
            colorAttachments: [
                {
                    view: textureView,
                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                    loadOp: "clear",
                    storeOp: "store"
                }
            ]
        };
        const commandEncoder = device.createCommandEncoder();
        {
            // Computation
            const passEncoder = commandEncoder.beginComputePass();
            passEncoder.setPipeline(computePipeline);
            passEncoder.setBindGroup(0, particleBindGroups[t % 2]);
            passEncoder.dispatch(Math.ceil(NUMPARTICLES / 64));
            //passEncoder.endPass();
            passEncoder.end();
        }
        {
            // Rendering
            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
            passEncoder.setPipeline(renderPipeline);
            passEncoder.setVertexBuffer(0, particleBuffers[(t + 1) % 2]);
            passEncoder.draw(NUMPARTICLES);
            //passEncoder.endPass();    
            passEncoder.end();
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
        if (updatePerformance) {
            updatePerformance = false;
            let averageFramePerSecond = Math.round(totalFramePerSecond / frameCounter);
            frameCounter = 0;
            totalFramePerSecond = 0;
            document.getElementById("fps").innerHTML = `FPS:  ${averageFramePerSecond}`;
            setTimeout(() => {
                updatePerformance = true;
            }, 50); // update FPS every 50ms
        }
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
});
main();

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map