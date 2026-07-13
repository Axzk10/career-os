type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <input
        type="search"
        placeholder="Search by company, title, or location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 520,
        }}
      />
    </div>
  );
}
