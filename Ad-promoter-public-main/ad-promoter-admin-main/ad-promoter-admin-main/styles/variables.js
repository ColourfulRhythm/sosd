import { createGlobalStyle } from 'styled-components';

// store global css variables here
export const VariableStyle = createGlobalStyle`
    :root{
        --primary: #4F00CF;
        --bg: #FAFAFA;
        --red: #EB1E1E;
        --black: #000000;
        --black-1: #0D0D0D;
        --black-2: #2C2828;
        --black-3: #010101;
        --black-4: #111111;
        --white: #FFFFFF;
        --gray: #666666;
        --dark-gray: #333333;
        --dark-gray-1: #383838;
        --dark-gray-2: #4D4D4D;
        --dark-gray-2: #454545;
        --light-gray: #E8E5FF;
        --light-gray-1: #616161;
        --light-gray-2: #828282;
        --lighter-gray: #F5F5F7;
        --light-gray-3: #BEBEBE;
        --green: #1EB624;
        --green-2: #00B068;
        --blue: #2C59F7;
        --light-blue: #6B8BFC;
        --light-blue-1: #5C85FF;
        --light-blue-2: #98ABFF;
        --yellow: #FBBC05;
        --light-primary: #E9E1F6;
        --light-primary-2: #A28EBC;
        --deep-blue: #141522;
        --unknown-1: #D2EFFF;
        --unknown-2: #FFE2C7;
        --unknown-3: #C8C7FF;
        --unknown-4: #C7FFDD;
        --unknown-5: #101C79;

        --transparent-bg: rgba(255, 255, 255, 0.8);
        --transparent-bg-1: rgba(0, 0, 0, 0.6);

        --shadow-1: 4px 4px 12px rgba(0, 0, 0, 0.25);
        --shadow-2: 1px 2px 4px rgba(33, 76, 95, 0.2);
        --shadow-3: 1px 2px 4px rgba(60, 41, 24, 0.2);
        --shadow-4: 1px 2px 4px rgba(31, 14, 52, 0.2);
        --shadow-5: 1px 2px 4px rgba(22, 51, 19, 0.2);
        --shadow-6: 0px 1px 4px rgba(103, 127, 214, 0.15);
        
        --font-family: 'Poppins', sans-serif;
        --font-family-1: 'Inter', sans-serif;
        --font-family-2: 'Open Sans', sans-serif;

    }
`;
