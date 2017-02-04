function toUpperUnderscore(str) {
  return str.replace(/[A-Z]/g, p => `_${p}`).toUpperCase();
}

export default function asyncAction(dispatch, action) {
  const actionName = toUpperUnderscore(action.name);
  return async (...params) => {
    dispatch({ type: `${actionName}_REQUEST`, ...params });
    try {
      await action(dispatch, ...params);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Unexpected async action error', error);
      dispatch({ type: `${actionName}_FAILURE`, error: error.message });
    }
  };
}
