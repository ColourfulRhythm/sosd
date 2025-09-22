import { FilterDropdownStyles } from "../styles/summary";

const FilterDropdown = () => {
  return (
    <FilterDropdownStyles>
      <ul>
        <li>Recent</li>
        <li>A week ago</li>
        <li>Less than 2 weeks</li>
        <li>Last 30 days</li>
      </ul>
    </FilterDropdownStyles>
  );
};

export default FilterDropdown;
