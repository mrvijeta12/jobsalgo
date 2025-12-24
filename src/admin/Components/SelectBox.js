const SelectBox = ({ label, options = [], onChange }) => {
  return (
    <th>
      <div
        className="d-flex flex-column align-items-start"
        style={{ height: "100px" }}
      >
        <strong className="mb-1">{label}</strong>
        {options.length > 0 && (
          <select
            className="form-select form-select-sm mt-auto"
            onChange={(e) => onChange?.(e.target.value)}
          >
            <option value="">All</option>
            {options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
    </th>
  );
};

export default SelectBox;
