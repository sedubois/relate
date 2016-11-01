import { PropTypes } from 'react';

export default {
  wrapper: {
    width: '13em',
    margin: '0.5em',
    paddingTop: '1.5em',
    borderRadius: '5px',
    boxShadow: '0 1px 3px #A78100',
    textAlign: 'center',
  },
  p: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '90%',
    display: 'inline-block',
  },
  propType: PropTypes.shape({
    wrapper: PropTypes.object.isRequired,
    p: PropTypes.object.isRequired,
  }),
};
