import { WalletDropdownStyles } from '../styles/wallet';

const EditWalletDropdown = (props) => {
  return (
    <WalletDropdownStyles>
      <ul>
        <li>
          <button onClick={props.onOpen}>Edit</button>
        </li>
        <li>Clear all</li>
      </ul>
      <hr />
      <ul>
        <li>Delete</li>
      </ul>
    </WalletDropdownStyles>
  );
};

export default EditWalletDropdown;
