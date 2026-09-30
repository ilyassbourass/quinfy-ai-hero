const fs = require('fs');

const buf = fs.readFileSync('LeePerrySmith.glb');

// Chunk 0: JSON
const chunk0Length = buf.readUInt32LE(12);
const jsonStr = buf.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonStr);

// Chunk 1: BIN
const chunk1Offset = 20 + chunk0Length;
const chunk1Length = buf.readUInt32LE(chunk1Offset);
const binBuffer = buf.subarray(chunk1Offset + 8, chunk1Offset + 8 + chunk1Length);

const posAccessorIndex = gltf.meshes[0].primitives[0].attributes.POSITION;
const accessor = gltf.accessors[posAccessorIndex];
const bufferView = gltf.bufferViews[accessor.bufferView];

const byteOffset = (bufferView.byteOffset || 0) + (accessor.byteOffset || 0);
const count = accessor.count;

const rawVertices = [];
let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;
let minZ = Infinity, maxZ = -Infinity;

for (let i = 0; i < count; i++) {
  const offset = byteOffset + i * 12;
  const x = binBuffer.readFloatLE(offset);
  const y = binBuffer.readFloatLE(offset + 4);
  const z = binBuffer.readFloatLE(offset + 8);

  minX = Math.min(minX, x); maxX = Math.max(maxX, x);
  minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);

  rawVertices.push([x, y, z]);
}

const centerX = (minX + maxX) / 2;
const centerY = (minY + maxY) / 2;
const centerZ = (minZ + maxZ) / 2;
const scale = 2.8 / Math.max(maxX - minX, maxY - minY, maxZ - minZ);

const frontVertices = [];
for (const [x, y, z] of rawVertices) {
  const nx = (x - centerX) * scale;
  const ny = (y - centerY) * scale;
  const nz = (z - centerZ) * scale;

  // Keep face front & features
  if (nz > -0.38 && ny > -1.25 && ny < 1.35) {
    frontVertices.push([
      Math.round(nx * 1000) / 1000,
      Math.round(ny * 1000) / 1000,
      Math.round(nz * 1000) / 1000
    ]);
  }
}

// Sample ~2,600 points
const targetCount = 2600;
const step = Math.max(1, Math.floor(frontVertices.length / targetCount));
const sampled = [];
for (let i = 0; i < frontVertices.length; i += step) {
  sampled.push(frontVertices[i]);
}

console.log('Sampled point count:', sampled.length);

// Compute tight local mesh lines (only between close neighbors within 0.05 to 0.14 distance)
const lineIndices = [];
const maxDistSq = 0.12 * 0.12;
const minDistSq = 0.02 * 0.02;

for (let i = 0; i < sampled.length; i++) {
  let connections = 0;
  // Check nearby indices
  const checkRange = Math.min(sampled.length, i + 35);
  for (let j = i + 1; j < checkRange; j++) {
    const dx = sampled[i][0] - sampled[j][0];
    const dy = sampled[i][1] - sampled[j][1];
    const dz = sampled[i][2] - sampled[j][2];
    const dSq = dx * dx + dy * dy + dz * dz;

    if (dSq > minDistSq && dSq < maxDistSq) {
      lineIndices.push(i, j);
      connections++;
      if (connections >= 4) break; // max 4 connections per point for ultra clean aesthetic
    }
  }
}

console.log('Clean wireframe line segments:', lineIndices.length / 2);

const outContent = `// Photorealistic 3D Biometric Face Landmark Point Cloud & Delaunay Lattice
window.FACE_LANDMARK_POINTS = ${JSON.stringify(sampled)};
window.FACE_LATTICE_LINES = ${JSON.stringify(lineIndices)};
`;

fs.writeFileSync('face-data.js', outContent);
console.log('Saved face-data.js successfully, size:', fs.statSync('face-data.js').size);
