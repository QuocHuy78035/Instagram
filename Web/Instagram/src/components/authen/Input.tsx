export default function Input(body: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e) => void;
}) {
  return (
    <input
      type={body.type}
      placeholder={body.placeholder}
      className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={body.value}
      onChange={body.onChange}
    />
  );
}
