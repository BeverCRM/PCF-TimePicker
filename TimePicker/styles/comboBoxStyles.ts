export const comboBoxStyles = {
  callout: {
    height: '230px',
    overflowY: 'none',
    width: '200px',

    '.ms-Callout-main': {
      height: 'inherit',
      overflowY: 'revert',
    },
  },

  container: {
    width: '100%',
  },
  root: {
    paddingLeft: '5px',
    marginRight: '5px',
    height: '35px',
    marginTop: '3px',
    '::after': {
      border: 'none',
    },
    ':hover': {
      border: '1px solid',
    },
  },

  rootDisabled: {
    backgroundColor: 'transparent',
    paddingLeft: '0px',
    ':hover': {
      backgroundColor: 'rgb(216, 216, 216)',
      border: 'none',
    },
    '.ms-ComboBox-CaretDown-button': {
      display: 'none',
      background: 'transparent',
    },
  },
  inputDisabled: {
    paddingLeft: '5px',
    backgroundColor: 'transparent',
    color: 'rgb(50, 49, 58)',

    ':hover': {
      backgroundColor: 'rgb(216, 216, 216)',
      border: 'none',
    },
  },
};

export const clockIconeStyles = {
  root: {
    fontSize: '15px',
  },
};
