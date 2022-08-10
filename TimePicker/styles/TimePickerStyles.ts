export const comboBoxStyles = {
  callout: {
    height: '230px !important',
    overflowY: 'auto !important',
    width: '200px !important',

    '.ms-Callout-main': {
      maxHeight: 'none !important',
      overflowY: 'hidden !important',
    },
  },
  root: {
    paddingLeft: '5px !important',
    marginRight: '5px !important',
    '::after': {
      border: 'none !important',
    },
    ':hover': {
      border: '1px solid !important',
    },
  },

  rootDisabled: {
    backgroundColor: 'transparent !important',
    paddingLeft: '0px !important',
    ':hover': {
      backgroundColor: 'rgb(216, 216, 216) !important',
      border: 'none !important',
    },
  },
  inputDisabled: {
    paddingLeft: '5px !important',
    backgroundColor: 'transparent !important',
    color: 'rgb(50, 49, 58) !important',

    ':hover': {
      backgroundColor: 'rgb(216, 216, 216) !important',
      border: 'none !important',
    },
  },
};

export const clockIconeStyles = {
  root: {
    fontSize: '15px !important',
  },
};
