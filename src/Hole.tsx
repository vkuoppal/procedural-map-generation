import "./Hole.css";

export const Hole = (props: { top: number; left: number }) => {
  const position = { top: props.top, left: props.left };
  return (
    <div
      style={{ marginTop: position.top, marginLeft: position.left }}
      className="minigolf-hole"
    />
  );
};
