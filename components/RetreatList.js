import { PropTypes } from 'react';
import gql from 'graphql-tag';
import { FormattedMessage } from 'react-intl';
import ItemList from './ItemList';
import ItemPreview from './ItemPreview';

function RetreatList({ retreats }) {
  return (
    <ItemList title={<FormattedMessage id="RetreatList.title" />}>
      {retreats.map(retreat => (
        <ItemPreview
          key={retreat.id}
          link={{
            route: 'retreat',
            params: { id: retreat.id },
          }}
        >
          <p>{retreat.title}</p>
        </ItemPreview>
      ))}
    </ItemList>
  );
}

RetreatList.fragments = {
  retreats: gql`
    fragment Retreats on Member {
      retreats {
        id
        title
      }
    }
  `,
};

RetreatList.propTypes = {
  // TODO figure out why this yields an error
  // retreats: propType(RetreatList.fragments.retreats).isRequired,
  retreats: PropTypes.array.isRequired,
};

export default RetreatList;
