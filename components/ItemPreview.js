import React, { PropTypes } from 'react';
import { Link } from '../routes';

function ItemPreview({ link: { route, params }, children }) {
  return (
    <Link route={route} params={params}>
      <a className="wrapper">
        {children}
        <style jsx>{`
          .wrapper {
            width: 13em;
            margin: 0.5em;
            padding-top: 1.5em;
            border-radius: 5px;
            box-shadow: 0 1px 3px #A78100;
            text-align: center;
          }

          p {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 90%;
          }

          .playButton {
            font-size: 200%;
            margin: 10px;
          }
        `}</style>
      </a>
    </Link>
  );
}

ItemPreview.propTypes = {
  link: PropTypes.shape({
    route: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default ItemPreview;
