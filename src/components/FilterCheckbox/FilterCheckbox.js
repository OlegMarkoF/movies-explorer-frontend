import "./FilterCheckbox.css";

function FilterCheckbox({ onFilterChange, filterOn, isSeaching }) {
  return (
    <label className="filter__checkbox-text">
      Короткометражки
      <input
        className="filter__checkbox-input"
        type="checkbox"
        name="toggle"
        checked={filterOn}
        disabled={isSeaching ? true : false}
        onChange={(evt) => onFilterChange(evt.target.checked)}
      />
      <span className="filter__track"></span>
    </label>
  );
}

export default FilterCheckbox;
