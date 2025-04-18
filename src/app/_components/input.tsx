export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className="border-primary-100 rounded-sm border px-2 py-1.5 focus:outline-none"
    />
  );
}
