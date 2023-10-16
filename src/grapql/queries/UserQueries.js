const LIST_USERS = `
  query ListUsers {
    listZellerCustomers {
      items {
        name,
        role,
        id
      }
    }
  }
`;

const FILTER_USERS_BY_ROLE = `
  query ListUsers($role: String!) {
    listZellerCustomers(filter: { role: { eq: $role } }) {
      items {
        name,
        role,
        id
      }
    }
  }
`;

const SEARCH_USERS = `
  query SearchUsers($searchTerm: String!) {
    listZellerCustomers(filter: {
      name: {
        contains: $searchTerm
      }
    }) {
      items {
        name
        role
      }
    }
  }
`;

export { LIST_USERS, FILTER_USERS_BY_ROLE, SEARCH_USERS };
