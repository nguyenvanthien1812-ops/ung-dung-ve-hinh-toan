// Test file để kiểm tra các generators
import { generateTriangle, generateRightTriangle, generateSquare, generateCircle } from './generators/planeGeometry.js';
import { generatePyramid, generateCube, generateCylinder } from './generators/solidGeometry.js';
import { generateLinearGraph, generateQuadraticGraph, generateSineGraph, generateVector2D } from './generators/graphs.js';

// Test tam giác
console.log('=== TEST TAM GIÁC ===');
const triangleCode = generateTriangle({
  sideA: 5,
  sideB: 4,
  sideC: 3,
  labelA: 'A',
  labelB: 'B',
  labelC: 'C',
  showSides: true
});
console.log(triangleCode);

// Test hình vuông
console.log('\n=== TEST HÌNH VUÔNG ===');
const squareCode = generateSquare({
  side: 4,
  showDiagonals: true
});
console.log(squareCode);

// Test hình chóp
console.log('\n=== TEST HÌNH CHÓP ===');
const pyramidCode = generatePyramid({
  baseType: 'square',
  baseSize: 4,
  height: 5,
  showHiddenEdges: true
});
console.log(pyramidCode);

// Test đồ thị bậc 2
console.log('\n=== TEST ĐỒ THỊ BẬC 2 ===');
const quadraticCode = generateQuadraticGraph({
  a: 1,
  b: -2,
  c: 1,
  minX: -2,
  maxX: 4,
  showVertex: true
});
console.log(quadraticCode);

export { triangleCode, squareCode, pyramidCode, quadraticCode };
