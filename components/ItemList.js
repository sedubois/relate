import React, { PropTypes } from 'react';

function ItemList({ title, children }) {
  return (
    <div>
      <div className="listTitle">
        {title}
      </div>
      <div className="list">
        {children}
      </div>
      <style jsx>{`
        .listTitle {
          border-bottom: 1px solid #FFC500;
          font-size: 120%;
          margin-bottom: 1em;
          text-align: center;
        }

        .list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

ItemList.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default ItemList;
