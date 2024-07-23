export default function Tab({ mode, setMode, icon, name }) {
  return (
    <li
      className={`flex space-x-1 pt-4 cursor-pointer`}
      style={{
        borderTop: `${mode === name ? "1px solid black" : "0px"}`,
        color: `${mode === name ? "rgb(0,0,0)" : "rgb(120,120,120)"}`,
      }}
      onClick={function () {
        setMode(name);
      }}
    >
      {icon}
      <div>{name}</div>
    </li>
  );
}
