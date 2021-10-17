/* Extra small devices (phones, 600px and down) */
export const MOBILE = '@media only screen and (max-width: 600px)';

/* Small devices (portrait tablets and large phones, 600px and up) */
export const TABLET = '@media only screen and (min-width: 600px)';

/* Large devices (LEPTOPs/DESKTOPs, 992px and up) */
export const LAPTOP = '@media only screen and (min-width: 992px)';

/* Extra large devices (large LEPTOPs and DESKTOPs, 1200px and up) */
export const DESKTOP = '@media only screen and (min-width: 1200px)';

const breakPoints = {
  MOBILE,
  TABLET,
  LAPTOP,
  DESKTOP,
};

export default breakPoints;
