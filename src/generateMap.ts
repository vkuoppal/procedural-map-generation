export const generateMap = (traverseMatrix: number[][]) => {
  const matrix = generateMapMatrix(traverseMatrix);
  let blockPositions = [];
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[i].length; ++j) {
      if (matrix[i][j] === 1) {
        blockPositions.push([i * 20, j * 20]);
      }
    }
  }

  return blockPositions;
};

const generateMapMatrix = (traverseMatrix: number[][]) => {
  // 50 x 30 matrix of 20px * 20px blocks
  const matrix: number[][] = [];

  for (let i = 0; i < 30; ++i) {
    const row: number[] = [];
    for (let j = 0; j < 50; ++j) {
      if (traverseMatrix[i][j] === 1) {
        row.push(0);
      } else {
        row.push(generateBinary());
      }
    }

    matrix.push(row);
  }

  return matrix;
};

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export const traverseFromStartToHole = (
  startPoint: {
    left: number;
    top: number;
  },
  pathLength: number
) => {
  const traverseMatrix: number[][] = [];
  for (let i = 0; i < 30; ++i) {
    const row: number[] = [];
    for (let j = 0; j < 50; ++j) {
      row.push(0);
    }

    traverseMatrix.push(row);
  }
  let currentPathIndex = 0;
  let currentPoint = Object.assign({}, startPoint);

  // Start point
  traverseMatrix[currentPoint.left][currentPoint.top] = 1;

  do {
    const randomDirection = direction();

    switch (randomDirection) {
      case Direction.Up:
        if (currentPoint.top - 1 > 0) {
          currentPoint.top -= 1;
        }
        break;
      case Direction.Down:
        if (currentPoint.top + 1 < 30) {
          currentPoint.top += 1;
        }
        break;
      case Direction.Left:
        if (currentPoint.left - 1 > 0) {
          currentPoint.left -= 1;
        }
        break;
      case Direction.Right:
        if (currentPoint.left + 1 < 50) {
          currentPoint.left += 1;
        }
    }

    if (traverseMatrix[currentPoint.left][currentPoint.top] === 0) {
      currentPathIndex++;
    }

    traverseMatrix[currentPoint.left][currentPoint.top] = 1;
  } while (currentPathIndex <= pathLength);

  return {
    traverseMatrix,
    endPoint: { left: currentPoint.left, top: currentPoint.top },
  };
};

const direction = () => {
  const randomDirection = Math.floor(Math.random() * 4);
  switch (randomDirection) {
    case 0:
      return Direction.Up;
    case 1:
      return Direction.Down;
    case 2:
      return Direction.Left;
    case 3:
      return Direction.Right;
  }
};

const generateBinary = () => {
  return Math.round(Math.random());
};
