import React from "react";
import "./App.css";
import { Ball } from "./Ball";
import { Block } from "./Block";
import { generateMap, traverseFromStartToHole } from "./generateMap";
import { Hole } from "./Hole";

function App() {
  const [map, setMap] = React.useState<undefined | number[][]>(undefined);
  const [startPoint, setStartPoint] = React.useState<
    undefined | { left: number; top: number }
  >(undefined);
  const [holePoint, setHolePoint] = React.useState<
    undefined | { left: number; top: number }
  >(undefined);
  React.useEffect(() => {
    const startCoords = {
      left: Math.floor(Math.random() * 29),
      top: Math.floor(Math.random() * 49),
    };

    setStartPoint(startCoords);

    const traverseResult = traverseFromStartToHole(startCoords, 100);
    setHolePoint(traverseResult.endPoint);
    setMap(generateMap(traverseResult.traverseMatrix));
  }, []);

  if (!startPoint || !holePoint || !map) {
    return null;
  }

  return (
    <div className="App">
      <div id="minigolf-container">
        <Ball
          initialTop={startPoint.top * 20}
          initialLeft={startPoint.left * 20}
          map={map}
        />
        {map.map((blockPosition) => (
          <Block left={blockPosition[1]} top={blockPosition[0]} />
        ))}
        <Hole top={holePoint.left * 20} left={holePoint.top * 20} />
      </div>
    </div>
  );
}

export default App;
