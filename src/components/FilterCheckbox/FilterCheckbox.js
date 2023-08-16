import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <section className="filter">
      <span className="filter__span"></span>
      <label className="filter__checkbox">
        Короткометражки
        <input
          className="filter__checkbox-input"
          type="checkbox"
          name="toggle"
        />
      </label>
    </section>
  );
}

export default FilterCheckbox;
