const fs = require('fs');
const content = fs.readFileSync('face-data.js', 'utf8');
const jsonPart = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const pts = JSON.parse(jsonPart);

let maxZPt = pts[0], minZPt = pts[0];
let maxYPt = pts[0], minYPt = pts[0];
pts.forEach(p => {
  if (p[2] > maxZPt[2]) maxZPt = p;
  if (p[2] < minZPt[2]) minZPt = p;
  if (p[1] > maxYPt[1]) maxYPt = p;
  if (p[1] < minYPt[1]) minYPt = p;
});

console.log('Max Z (nose protrusion):', maxZPt);
console.log('Min Z (back of head/ears):', minZPt);
console.log('Max Y (top of cranium):', maxYPt);
console.log('Min Y (bottom of neck):', minYPt);
