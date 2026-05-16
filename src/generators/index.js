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
  generateParallelogram,
  generateTrapezoid,
  generateKite,
  generateQuadrilateralGeneral,
  generateRegularPolygon,
  generateCircle,
  generateCircleChord,
  generateTangentCircle,
  generateCircleSecant,
  generateTwoCirclesIntersect,
  generateTwoCirclesTangentExternal,
  generateTwoCirclesTangentInternal,
  generateCircleSector,
  generateCircleSegment,
  generateTriangleWithMedians,
  generateTriangleWithAltitudes,
  generateTriangleWithBisectors
} from './planeGeometry.js';

import {
  generatePyramid,
  generatePrism,
  generateCube,
  generateCylinder,
  generateCone,
  generateSphere,
  generatePlaneBasic,
  generateLinePlaneIntersect,
  generateTwoPlanesIntersect,
  generateLinePerpendicularPlane
} from './solidGeometry.js';

import {
  generateBBTQuadratic,
  generateBBTCubic,
  generateBBTRational11,
  generateBBTCustom
} from './variationTable.js';

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
  generateVectorSum,
  generateVector3D,
  generateVector3DSum,
  generateVectorCrossProduct,
  generateCoordinateSystem3D
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
  'triangle-with-medians': generateTriangleWithMedians,
  'triangle-with-altitudes': generateTriangleWithAltitudes,
  'triangle-with-bisectors': generateTriangleWithBisectors,

  // Tứ giác
  'square': generateSquare,
  'rectangle': generateRectangle,
  'rhombus': generateRhombus,
  'parallelogram': generateParallelogram,
  'trapezoid': generateTrapezoid,
  'isosceles-trapezoid': generateTrapezoid,
  'kite': generateKite,
  'quadrilateral-general': generateQuadrilateralGeneral,

  // Đường tròn
  'circle-basic': generateCircle,
  'circle-chord': generateCircleChord,
  'circle-tangent': generateTangentCircle,
  'circle-secant': generateCircleSecant,
  'two-circles-intersect': generateTwoCirclesIntersect,
  'two-circles-tangent-external': generateTwoCirclesTangentExternal,
  'two-circles-tangent-internal': generateTwoCirclesTangentInternal,
  'circle-sector': generateCircleSector,
  'circle-segment': generateCircleSegment,

  // Đa giác
  'pentagon': (p) => generateRegularPolygon({ ...p, sides: 5 }),
  'pentagon-regular': (p) => generateRegularPolygon({ ...p, sides: 5 }),
  'hexagon': (p) => generateRegularPolygon({ ...p, sides: 6 }),
  'hexagon-regular': (p) => generateRegularPolygon({ ...p, sides: 6 }),
  'octagon-regular': (p) => generateRegularPolygon({ ...p, sides: 8 }),
  'polygon-regular': generateRegularPolygon,

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
  'plane-basic': generatePlaneBasic,
  'line-plane-intersect': generateLinePlaneIntersect,
  'two-planes-intersect': generateTwoPlanesIntersect,
  'line-perpendicular-plane': generateLinePerpendicularPlane,

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

  // Bảng biến thiên
  'bbt-quadratic': generateBBTQuadratic,
  'bbt-cubic': generateBBTCubic,
  'bbt-rational-11': generateBBTRational11,
  'bbt-custom': generateBBTCustom,

  // Vectơ
  'vector-2d': generateVector2D,
  'vector-sum': generateVectorSum,
  'vector-difference': generateVectorSum,
  'vector-dot-product': generateVector2D,
  'vector-projection': generateVector2D,
  'vector-3d': generateVector3D,
  'vector-3d-sum': generateVector3DSum,
  'vector-cross-product': generateVectorCrossProduct,
  'coordinate-system-3d': generateCoordinateSystem3D
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
