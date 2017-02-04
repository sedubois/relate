export default function asyncAction(dispatch, actionName, action) {
  return async (params) => {
    dispatch({ type: `${actionName}_REQUEST`, params });
    try {
      dispatch(await action(params));
    } catch (e) {
      dispatch(`${actionName}_FAILURE`);
    }
  };
}
