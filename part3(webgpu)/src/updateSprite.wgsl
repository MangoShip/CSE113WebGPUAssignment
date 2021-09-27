struct Particle {
    pos : vec2<f32>;
};

[[block]] struct Particles {
    particles : [[stride(8)]] array<Particle>;
};

[[binding(0), group(0)]] var<storage, read_write> particlesA : Particles;

[[stage(compute), workgroup_size(64)]]
fn main([[builtin(global_invocation_id)]] GlobalInvocationID : vec3<u32>) {
    var index : u32 = GlobalInvocationID.x;

    // Get position of current particle
    var vPos = particlesA.particles[index].pos;

    // ADD YOUR COMPUTATION HERE
    //
    //
    //
    //
    //
        
    // Example Computation (DELETE THIS)
    vPos.x = vPos.x + 0.001;
    vPos.y = vPos.y + 0.001;

    // Write new particle data
    particlesA.particles[index].pos = vPos;
}