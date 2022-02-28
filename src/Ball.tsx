import React from "react";
import "./Ball.css";

function calculateAngle(
  touchX: number,
  touchY: number,
  centerX: number,
  centerY: number
): number {
  const deltaX = centerX - touchX;
  const deltaY = centerY - touchY;
  return Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 180;
}

export const Ball = (props: {
  initialTop: number;
  initialLeft: number;
  map: number[][];
}) => {
  const initialPosition = { x: props.initialTop, y: props.initialLeft };
  const [position, setPosition] =
    React.useState<{ x: number; y: number }>(initialPosition);

  const ballRef = React.useRef<HTMLDivElement | null>(null);
  const positionValueRef = React.useRef<{ x: number; y: number }>();
  positionValueRef.current = position;

  const [aim, setAim] = React.useState<{
    end: { x: number; y: number };
    start: { x: number; y: number };
  }>();

  const aimValueRef = React.useRef<{
    end: { x: number; y: number };
    start: { x: number; y: number };
  }>();
  aimValueRef.current = aim;

  React.useEffect(() => {
    window.addEventListener("mousemove", aiming);
    window.addEventListener("mouseup", shoot);

    return () => {
      window.removeEventListener("mouseup", shoot);
      window.removeEventListener("mousemove", aiming);
    };
  }, []);

  const shoot = () => {
    console.log("PROPS", props.map);
    const frameRect = document
      ?.getElementById("minigolf-container")
      ?.getBoundingClientRect();

    console.log("frameRect", frameRect);

    const aimCur = aimValueRef.current;
    let angle = calculateAngle(
      aimCur?.end.x!,
      aimCur?.end.y!,
      aimCur?.start.x!,
      aimCur?.start.y!
    );

    const a = aimCur?.end.x! - aimCur?.start.x!;
    const b = aimCur?.end.y! - aimCur?.start.y!;

    const distanceBetween = Math.sqrt(a * a + b * b);

    let velocity = distanceBetween / 10 + 10;

    const timerId = setInterval(() => {
      velocity--;

      if (velocity > 0) {
        const rect = ballRef?.current?.getBoundingClientRect();
        const offsetX = rect?.x! - frameRect?.x! + 7;
        const offsetY = rect?.y! - frameRect?.y! + 7;

        for (let i = 0; i < props.map.length - 1; ++i) {
          const mapCoord = props.map[i];
          if (
            offsetX <= mapCoord[1] + 29 &&
            offsetX >= mapCoord[1] - 9 &&
            offsetY <= mapCoord[0] + 29 &&
            offsetY >= mapCoord[0] - 9
          ) {
            angle = angle + 90;
          }
        }

        setPosition((prevValue) => ({
          x: prevValue.x + velocity * Math.cos((angle * Math.PI) / 180),
          y: prevValue.y + velocity * Math.sin((angle * Math.PI) / 180),
        }));
      }
    }, 20);

    return () => clearInterval(timerId);
  };

  function aiming(e: MouseEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rect.width !== 1000 || rect.height !== 600) {
      return;
    }

    const startX = positionValueRef?.current?.x! + 7;
    const startY = positionValueRef?.current?.y! + 7;
    setAim({ end: { x, y }, start: { x: startX, y: startY } });
  }

  return (
    <>
      <svg>
        <line
          x1={aim?.start.x}
          y1={aim?.start.y}
          x2={aim?.end.x}
          y2={aim?.end.y}
        ></line>
      </svg>
      <div
        ref={ballRef}
        style={{ marginTop: position.y, marginLeft: position.x }}
        className="minigolf-ball"
      />
    </>
  );
};
