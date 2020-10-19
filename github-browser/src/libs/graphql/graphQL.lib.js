import axios from 'axios'

async function graphql(query, variables = {}) {
  let headers = {
    authorization: '',
  }
  let graphql_url = 'https://api.github.com/graphql'
  return await axios.post(
    graphql_url,
    {
      query,
      variables
    },
    {
      headers: headers
    }
  )
}

export default graphql
