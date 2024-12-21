export default function Button({
  name,
  onClick,
  color,
  backgroundColor,
  hoverBackgroundColor,
}) {
  return (
    <button
      className={`px-3 py-1 rounded-md bg-[${backgroundColor}] hover:bg-[${hoverBackgroundColor}] font-semibold my-auto cursor-pointer outline-none`}
      style={{
        color: `${color}`,
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
