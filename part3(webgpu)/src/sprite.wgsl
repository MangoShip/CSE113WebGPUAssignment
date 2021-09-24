// Chooses shape of each rendered object
[[stage(vertex)]]
fn vert_main() -> [[builtin(position)]] vec4<f32> {                             
    return vec4<f32>(1.0, 1.0, 0.0, 1.0);
}

// Chooses color of each rendered object
[[stage(fragment)]] 
fn frag_main() -> [[location(0)]] vec4<f32> {
    return vec4<f32>(1.0, 1.0, 1.0, 1.0);
}