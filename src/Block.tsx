import "./Block.css";

export const Block = (props: { top: number; left: number }) => (
  <div
    style={{ marginTop: props.top, marginLeft: props.left }}
    className="minigolf-block"
  />
);
