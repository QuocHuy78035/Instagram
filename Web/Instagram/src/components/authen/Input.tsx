export default function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={onChange}
    />
  );
}
