import React, { PropTypes } from 'react';
import Link from 'next/link';

function ItemPreview({ href, as, children }) {
  return (
    <Link href={href} as={as}>
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
  href: PropTypes.string.isRequired,
  as: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ItemPreview;
