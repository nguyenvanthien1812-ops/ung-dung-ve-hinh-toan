// Generator registry - map shape IDs to their generator functions

import {
  generateTriangle,
  generateRightTriangle,
  generateIsoscelesTriangle,
  generateEquilateralTriangle,
  generateInscribedTriangle,
  generateSquare,
  generateRectangle,
  generateRhombus,
  generateCircle,
  generateTangentCircle
} from './planeGeometry.js';

import {
  generatePyramid,
  generatePrism,
  generateCube,
  generateCylinder,
  generateCone,
  generateSphere
} from './solidGeometry.js';

import {
  generateLinearGraph,
  generateQuadraticGraph,
  generateCubicGraph,
  generateHyperbolaGraph,
  generateSineGraph,
  generateCosineGraph,
  generateTangentGraph,
  generateExponentialGraph,
  generateLogarithmGraph,
  generateAbsoluteGraph,
  generateVector2D,
  generateVectorSum
} from './graphs.js';

import { getFormSchema } from '../data/formSchemas.js';

const GENERATOR_MAP = {
  // Tam giác
  'triangle-general': generateTriangle,
  'triangle-right': generateRightTriangle,
  'triangle-isosceles': generateIsoscelesTriangle,
  'triangle-equilateral': generateEquilateralTriangle,
  'triangle-inscribed': generateInscribedTriangle,
  'triangle-circumscribed': (p) => generateInscribedTriangle({ ...p, triangleType: 'Thường' }),
  'triangle-with-medians': generateTriangle,
  'triangle-with-altitudes': generateTriangle,
  'triangle-with-bisectors': generateTriangle,

  // Tứ giác
  'square': generateSquare,
  'rectangle': generateRectangle,
  'rhombus': generateRhombus,
  'parallelogram': generateRhombus,
  'trapezoid': generateRectangle,
  'isosceles-trapezoid': generateRhombus,
  'kite': generateRectangle,
  'quadrilateral-general': generateRectangle,

  // Đường tròn
  'circle-basic': generateCircle,
  'circle-chord': generateCircle,
  'circle-tangent': generateTangentCircle,
  'circle-secant': generateTangentCircle,
  'two-circles-intersect': generateCircle,
  'two-circles-tangent-external': generateCircle,
  'two-circles-tangent-internal': generateCircle,
  'circle-sector': generateCircle,
  'circle-segment': generateCircle,

  // Đa giác
  'pentagon': generateRhombus,
  'pentagon-regular': generateRhombus,
  'hexagon': generateRhombus,
  'hexagon-regular': generateRhombus,
  'octagon-regular': generateRhombus,
  'polygon-regular': generateRhombus,

  // Hình không gian
  'pyramid-triangular': (params) => generatePyramid({ ...params, baseType: 'triangular' }),
  'pyramid-square': (params) => generatePyramid({ ...params, baseType: 'square' }),
  'pyramid-regular': (params) => generatePyramid({ ...params, baseType: 'square' }),
  'pyramid-truncated': (params) => generatePyramid({ ...params, baseType: 'triangular' }),
  'prism-triangular': (params) => generatePrism({ ...params, baseType: 'triangular' }),
  'prism-quadrilateral': generateCube,
  'prism-hexagonal': generatePrism,
  'box': generateCube,
  'cube': generateCube,
  'cylinder': generateCylinder,
  'cone': generateCone,
  'cone-truncated': generateCone,
  'sphere': generateSphere,
  'sphere-section': generateSphere,

  // Mặt phẳng & Đường thẳng
  'plane-basic': generateRhombus,
  'line-plane-intersect': generateRhombus,
  'two-planes-intersect': generateRhombus,
  'line-perpendicular-plane': generateRhombus,

  // Đồ thị
  'linear': generateLinearGraph,
  'quadratic': generateQuadraticGraph,
  'cubic': generateCubicGraph,
  'polynomial-general': generateCubicGraph,
  'hyperbola': generateHyperbolaGraph,
  'rational-linear': generateHyperbolaGraph,
  'rational-general': generateHyperbolaGraph,
  'sine': generateSineGraph,
  'cosine': generateCosineGraph,
  'tangent': generateTangentGraph,
  'trig-transform': generateSineGraph,
  'trig-combination': generateSineGraph,
  'exponential': generateExponentialGraph,
  'exponential-e': generateExponentialGraph,
  'logarithm': generateLogarithmGraph,
  'natural-log': generateLogarithmGraph,
  'absolute-linear': generateAbsoluteGraph,
  'absolute-quadratic': generateAbsoluteGraph,
  'absolute-composite': generateAbsoluteGraph,
  'parametric-circle': generateCircle,
  'parametric-ellipse': generateRhombus,
  'parametric-general': generateHyperbolaGraph,

  // Vectơ
  'vector-2d': generateVector2D,
  'vector-sum': generateVectorSum,
  'vector-difference': generateVectorSum,
  'vector-dot-product': generateVector2D,
  'vector-projection': generateVector2D,
  'vector-3d': generateVector2D,
  'vector-3d-sum': generateVectorSum,
  'vector-cross-product': generateVector2D,
  'coordinate-system-3d': generateVector2D
};

export function getGenerator(shapeId) {
  return GENERATOR_MAP[shapeId] || null;
}

export function getDefaultValues(shapeId) {
  const schema = getFormSchema(shapeId);
  if (!schema) return {};

  const defaults = {};
  schema.fields.forEach(field => {
    defaults[field.name] = field.default;
  });
  return defaults;
}

export const AVAILABLE_SHAPES = Object.keys(GENERATOR_MAP);
