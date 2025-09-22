import { useWidth } from '@/hooks';
import Image from 'next/image';
import { arrowUp, arrowDown } from '@/public/assets/icon';
import { FilterStyle } from './style.js';

const breakpoint = 1024;
const Filter = (props) => {
  const { responsive } = useWidth(breakpoint);

  return (
    <FilterStyle>
      {responsive ? (
        <>
          <div className="filter filter-button" onClick={props.onShowDropDown}>
            <p className="filter-button">This week</p>
            {props.showDropdown ? (
              <Image src={arrowDown} alt="arrow" />
            ) : (
              <Image src={arrowUp} alt="arrow" />
            )}
          </div>
          {props.showDropdown && (
            <ul onClick={props.onCloseDropdown}>
              <li className="filter-option">Today</li>
              <li className="filter-option">This week</li>
              <li className="filter-option">2 weeks ago</li>
              <li className="filter-option">Last 30 days</li>
            </ul>
          )}
        </>
      ) : (
        <>
          <div className="filter-group ">
            <div
              className="filter filter-button"
              onClick={props.onShowDropDown}
            >
              <p className="filter-button">This week</p>
              {props.showDropdown ? (
                <Image src={arrowDown} alt="arrow" />
              ) : (
                <Image src={arrowUp} alt="arrow" />
              )}
            </div>
            {props.showDropdown && (
              <ul onClick={props.onCloseDropdown}>
                <li className="filter-option">Today</li>
                <li className="filter-option">This week</li>
                <li className="filter-option">2 weeks ago</li>
                <li className="filter-option">Last 30 days</li>
              </ul>
            )}
          </div>
        </>
      )}
    </FilterStyle>
  );
};

export default Filter;
