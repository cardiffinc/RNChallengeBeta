import React, { useState as useStateMock } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '.';
import { API, graphqlOperation } from 'aws-amplify';
import { it } from '@jest/globals';
import { LIST_USERS } from '../../grapql/queries/UserQueries';

jest.mock('aws-amplify');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('HomeScreen', () => {
  const setErrors = jest.fn()
  const setUsers = jest.fn()
  const setLoading = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, setLoading])
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, setUsers])
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, setErrors])
  })
  it('renders user type selection', () => {
    const { getByText } = render(<HomeScreen navigation={null} />);
    expect(getByText('User Type')).toBeDefined();
    expect(getByText('Admin')).toBeDefined();
    expect(getByText('Manager')).toBeDefined();
    expect(getByText('All')).toBeDefined();
  });

  it('displays empty message when array is empty', async () => {
    // @ts-ignore
    const mockGraphQL = API.graphql.mockResolvedValue({ data: { listZellerCustomers: { items: [] } } })
    const response = await mockGraphQL()

    const { getByText } = render(<HomeScreen navigation={null} />);
    fireEvent.press(getByText('Admin'));

    expect(getByText('Oops, No users found!')).toBeDefined();
  });

  it('Identifies error message on API error', async () => {
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, setErrors])
    // @ts-ignore
    const mockGraphQL = API.graphql.mockResolvedValue({ errors: [{ message: 'Error' }] })
    const response = await mockGraphQL()
    const { getByText, update, findByText } = render(<HomeScreen navigation={null} />);
    expect(response.errors[0].message).toBe('Error')
    expect(setErrors).toBeCalled()
  });

  it('displays user items', async () => {
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, setUsers])
    const dataSample = { name: 'Shubhay', id: 1, role: 'Admin' }
    const mockResponse = {
      data: {
        listZellerCustomers: {
          items: [dataSample],
        },
      }
    }
    // @ts-ignore
    const mockGraphQL = API.graphql.mockResolvedValue(mockResponse)
    const response = await mockGraphQL()
    const { getByText } = render(<HomeScreen navigation={null} />);
    expect(graphqlOperation).toBeCalledWith(LIST_USERS)
    expect(response).toBeDefined()
    expect(response.data.listZellerCustomers.items[0].name).toBe('Shubhay')
    expect(setUsers).toBeCalled()
  });
});
