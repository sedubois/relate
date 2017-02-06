import { PropTypes } from 'react';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import { FormattedMessage } from 'react-intl';
import ItemList from './ItemList';
import ItemPreview from './ItemPreview';

function RetreatList({ retreats }) {
  return (
    <ItemList title={<FormattedMessage id="RetreatList.title" />}>
      {retreats.map(retreat => (
        <ItemPreview key={retreat.id} href={`/retreat?id=${retreat.id}`} as={`/retreat/${retreat.id}`}>
          <p>{retreat.title}</p>
        </ItemPreview>
      ))}
    </ItemList>
  );
}

RetreatList.fragments = {
  retreat: gql`
    fragment RetreatList on Retreat {
      id
      title
    }
  `,
};

RetreatList.propTypes = {
  retreats: PropTypes.arrayOf(
    propType(RetreatList.fragments.retreat).isRequired,
  ).isRequired,
};

export default RetreatList;
