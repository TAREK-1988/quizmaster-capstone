export default function Select({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={onChange} className="h-10 w-full rounded-lg border px-3">
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
