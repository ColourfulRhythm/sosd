import { FilterDropdownStyles } from "../styles/summary";

const FilterDropdown = ({handleFilterSelect}) => {
  return (
    <FilterDropdownStyles>
      <ul>
        <li onClick={handleFilterSelect}>Recent</li>
        <li onClick={handleFilterSelect}>A week ago</li>
        <li onClick={handleFilterSelect}>Less than 2 weeks</li>
        <li onClick={handleFilterSelect}>Last 30 days</li>
      </ul>
    </FilterDropdownStyles>
  );
};

export default FilterDropdown;
