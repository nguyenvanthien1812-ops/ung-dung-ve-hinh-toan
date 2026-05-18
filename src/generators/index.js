// Generator registry - map shape IDs to their generator functions

import {
  generateTriangle,
  generateRightTriangle,
  generateIsoscelesTriangle,
  generateEquilateralTriangle,
  generateInscribedTriangle,
  generateCircumscribedTriangle,
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
  generateTruncatedPyramid,
  generatePrism,
  generateCube,
  generateBox,
  generateCylinder,
  generateCone,
  generateTruncatedCone,
  generateSphere,
  generateSphereSection,
  generatePlaneBasic,
  generateLinePlaneIntersect,
  generateTwoPlanesIntersect,
  generateLinePerpendicularPlane
} from './solidGeometry.js';

import {
  generateBBTQuadratic,
  generateBBTCubic,
  generateBBTQuartic,
  generateBBTRational11,
  generateBBTCustom
} from './variationTable.js';

import {
  generateLinearGraph,
  generateQuadraticGraph,
  generateCubicGraph,
  generateHyperbolaGraph,
  generateRationalLinearGraph,
  generateTrigCombinationGraph,
  generateQuarticGraph,
  generateSineGraph,
  generateCosineGraph,
  generateTangentGraph,
  generateExponentialGraph,
  generateLogarithmGraph,
  generateAbsoluteLinearGraph,
  generateAbsoluteGraph,
  generateVector2D,
  generateVectorSum,
  generateVectorDifference,
  generateVectorDotProduct,
  generateVectorProjection,
  generateVector3D,
  generateVector3DSum,
  generateVectorCrossProduct,
  generateCoordinateSystem3D,
  generateParametricCircle,
  generateParametricEllipse,
  generateParametricGeneral
} from './graphs.js';

import {
  generateInclinedPlane,
  generateFreeBodyDiagram,
  generatePulley,
  generateSpringSystem,
  generateConvexLens,
  generateConcaveLens,
  generateConcaveMirror,
  generateConvexMirror,
  generateVelocityTimeGraph,
  generatePositionTimeGraph,
  generateElectricFieldPositive,
  generateElectricFieldNegative,
  generateCircuitSeries,
  generateCircuitParallel
} from './physics.js';

import { generateInequalityRegion, generateCircleRegion, generateParabolaRegion, generateMixedRegion } from './inequalities.js';

import {
  generateSignProduct2,
  generateSignProduct3,
  generateSignFraction
} from './signTable.js';

import { getFormSchema } from '../data/formSchemas.js';

const GENERATOR_MAP = {
  // Tam giác
  'triangle-general': generateTriangle,
  'triangle-right': generateRightTriangle,
  'triangle-isosceles': generateIsoscelesTriangle,
  'triangle-equilateral': generateEquilateralTriangle,
  'triangle-inscribed': generateInscribedTriangle,
  'triangle-circumscribed': generateCircumscribedTriangle,
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

  // Hình không gian - Chóp
  'pyramid-triangular': (params) => generatePyramid({ ...params, baseType: 'triangular' }),
  'pyramid-square': (params) => generatePyramid({ ...params, baseType: 'square' }),
  'pyramid-regular': (params) => generatePyramid({ ...params, baseType: 'square' }),
  'pyramid-truncated': generateTruncatedPyramid,

  // Lăng trụ
  'prism-triangular': (params) => generatePrism({ ...params, baseType: 'triangular' }),
  'prism-quadrilateral': generateBox,
  'prism-hexagonal': (params) => generatePrism({ ...params, baseType: 'hexagonal' }),
  'box': generateBox,
  'cube': generateCube,

  // Hình tròn xoay
  'cylinder': generateCylinder,
  'cone': generateCone,
  'cone-truncated': generateTruncatedCone,
  'sphere': generateSphere,
  'sphere-section': generateSphereSection,

  // Mặt phẳng & Đường thẳng
  'plane-basic': generatePlaneBasic,
  'line-plane-intersect': generateLinePlaneIntersect,
  'two-planes-intersect': generateTwoPlanesIntersect,
  'line-perpendicular-plane': generateLinePerpendicularPlane,

  // Đồ thị hàm số
  'linear': generateLinearGraph,
  'quadratic': generateQuadraticGraph,
  'cubic': generateCubicGraph,
  'quartic': generateQuarticGraph,
  'polynomial-general': generateCubicGraph,
  'hyperbola': generateHyperbolaGraph,
  'rational-linear': generateRationalLinearGraph,
  'rational-general': generateHyperbolaGraph,
  'sine': generateSineGraph,
  'cosine': generateCosineGraph,
  'tangent': generateTangentGraph,
  'trig-transform': generateSineGraph,
  'trig-combination': generateTrigCombinationGraph,
  'exponential': generateExponentialGraph,
  'exponential-e': generateExponentialGraph,
  'logarithm': generateLogarithmGraph,
  'natural-log': generateLogarithmGraph,
  'absolute-linear': generateAbsoluteLinearGraph,
  'absolute-quadratic': generateAbsoluteGraph,
  'absolute-composite': generateAbsoluteGraph,
  'parametric-circle': generateParametricCircle,
  'parametric-ellipse': generateParametricEllipse,
  'parametric-general': generateParametricGeneral,

  // Bảng biến thiên
  'bbt-quadratic': generateBBTQuadratic,
  'bbt-cubic': generateBBTCubic,
  'bbt-quartic': generateBBTQuartic,
  'bbt-rational-11': generateBBTRational11,
  'bbt-custom': generateBBTCustom,

  // Vectơ
  'vector-2d': generateVector2D,
  'vector-sum': generateVectorSum,
  'vector-difference': generateVectorDifference,
  'vector-dot-product': generateVectorDotProduct,
  'vector-projection': generateVectorProjection,
  'vector-3d': generateVector3D,
  'vector-3d-sum': generateVector3DSum,
  'vector-cross-product': generateVectorCrossProduct,
  'coordinate-system-3d': generateCoordinateSystem3D,

  // Vật lý - Lực học
  'physics-inclined-plane': generateInclinedPlane,
  'physics-fbd': generateFreeBodyDiagram,
  'physics-pulley': generatePulley,
  'physics-spring': generateSpringSystem,

  // Vật lý - Quang học
  'physics-convex-lens': generateConvexLens,
  'physics-concave-lens': generateConcaveLens,
  'physics-mirror-concave': generateConcaveMirror,
  'physics-mirror-convex': generateConvexMirror,

  // Vật lý - Đồ thị động học
  'physics-velocity-time': generateVelocityTimeGraph,
  'physics-position-time': generatePositionTimeGraph,

  // Vật lý - Điện học
  'physics-electric-field-positive': generateElectricFieldPositive,
  'physics-electric-field-negative': generateElectricFieldNegative,
  'physics-circuit-series': generateCircuitSeries,
  'physics-circuit-parallel': generateCircuitParallel,

  // Miền nghiệm bất phương trình
  'inequality-region': generateInequalityRegion,
  'circle-region': generateCircleRegion,
  'parabola-region': generateParabolaRegion,
  'mixed-region': generateMixedRegion,

  // Bảng xét dấu
  'sign-product2': generateSignProduct2,
  'sign-product3': generateSignProduct3,
  'sign-fraction': generateSignFraction
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
