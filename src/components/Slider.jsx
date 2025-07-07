export default function Slider({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  color = "blue",
}) {
  return (
    <div className="slider-container">
      <div className="slider-header">
        <label>{label}</label>
        <span className={`slider-value ${color}`}>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className={`slider-${color}`}
      />
      <div className="slider-range">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
