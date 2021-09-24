struct Particle {
    pos : vec2<f32>;
};

[[block]] struct Particles {
    particles : [[stride(16)]] array<Particle>;
};

[[binding(0), group(0)]] var<storage, read_write> particlesA : Particles;

[[stage(compute), workgroup_size(64)]]
fn main([[builtin(global_invocation_id)]] GlobalInvocationID : vec3<u32>) {
    var index : u32 = GlobalInvocationID.x;

    var vPos = particlesA.particles[index].pos;

    vPos.x = vPos.x + 1.0;
    vPos.y = vPos.y + 1.0;

    // Write new particle data
    particlesA.particles[index].pos = vPos;
}