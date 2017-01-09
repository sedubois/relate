import ApolloClient, { createNetworkInterface } from 'apollo-client'

export const initClient = (initialState, isServer) => {
  return new ApolloClient({
    ssrMode: isServer,
    initialState,
    dataIdFromObject: (result) => {
      if (result.id) {
        return result.id
      }
      return null
    },
    networkInterface: createNetworkInterface({
      uri: 'https://api.graph.cool/simple/v1/citr7kd6a2lo40168fh20r48g',
      opts: {
        credentials: 'same-origin'
      }
    })
  })
}
