import "./FilterCheckbox.css";

function FilterCheckbox({ onFilterChange, isFilterOn, isSearching }) {
  return (
    <section className="filter">
      <span className="filter__span"></span>
      <label className="filter__checkbox">
        Короткометражки
        <input
          className="filter__checkbox-input"
          type="checkbox"
          name="toggle"
          disabled={isSearching ? true : false}
          checked={isFilterOn}
          onChange={(e) => onFilterChange(e.target.checked)}
        />
      </label>
    </section>
  );
}

export default FilterCheckbox;
