export default function Button({ name, onClick }) {
  return (
    <button
      className="px-3 py-1 rounded-md bg-[rgb(239,239,239)] hover:bg-[rgb(220,220,220)] font-semibold my-auto cursor-pointer outline-none"
      onClick={onClick}
    >
      {name}
    </button>
  );
}
