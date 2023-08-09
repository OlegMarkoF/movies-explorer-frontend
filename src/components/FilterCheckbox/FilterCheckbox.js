import "./FilterCheckbox.css";

function FilterCheckbox({ onFilterChange, filterOn, isSeaching }) {
  return (
    <div className="filter">
      <span className="filter__span"></span>
      <label className="filter__checkbox">
        Короткометражки
        <input
          className="filter__checkbox-input"
          type="checkbox"
          name="toggle"
          checked={filterOn}
          disabled={isSeaching ? true : false}
          onChange={(evt) => onFilterChange(evt.target.checked)}
        />
      </label>
    </div>
  );
}

export default FilterCheckbox;
