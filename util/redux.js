function toUpperUnderscore(str) {
  return str.replace(/[A-Z]/g, p => `_${p}`).toUpperCase();
}

export default function mapDispatch(actionName, action) {
  const upperName = toUpperUnderscore(actionName);
  return dispatch => ({
    [actionName]: async (...params) => {
      dispatch({ type: `${upperName}_REQUEST`, ...params });
      try {
        await action(dispatch, ...params);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unexpected async action error', error);
        dispatch({ type: `${upperName}_FAILURE`, error: error.message });
      }
    },
  });
}
