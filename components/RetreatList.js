import { PropTypes } from 'react';
import { gql } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import ItemList from './ItemList';
import ItemPreview from './ItemPreview';

function RetreatList({ facilitatedRetreats }) {
  return (
    <ItemList title={<FormattedMessage id="RetreatList.title" />}>
      {facilitatedRetreats.map(retreat => (
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
  facilitatedRetreats: gql`
    fragment Retreats on User {
      facilitatedRetreats {
        id
        title
      }
    }
  `,
};

RetreatList.propTypes = {
  // TODO figure out why this yields an error
  // https://github.com/apollographql/graphql-anywhere/issues/37
  // facilitatedRetreats: propType(RetreatList.fragments.facilitatedRetreats).isRequired,
  facilitatedRetreats: PropTypes.array.isRequired,
};

export default RetreatList;
