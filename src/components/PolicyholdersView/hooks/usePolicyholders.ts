import { axiosRequest } from '../../../axiosInstance/index';
import { useQuery, UseQueryResult } from 'react-query';
import { formatAddress } from './formatAddress';
import { formatPhoneNumber } from './formatPhoneNumber';
import { Policyholder, Rows, Address } from '../types/types';

async function getPolicyholders(): Promise<Policyholder[]> {
  const { data } = await axiosRequest({ url: '/api/policyholders' });
  return data.policyHolders;
}

export const usePolicyholders = (): UseQueryResult<Rows[]> => {
  return useQuery('policyholders', getPolicyholders, {
    select: (data): Rows[] => {
      const policyholderRows = data.map((policyholder: Policyholder): Rows => {
        let rows: Rows = [];
        Object.entries(policyholder).forEach(([key, value]): void => {
          switch (key) {
            case 'name':
              rows.push({
                key: 'Name',
                value: value as string,
              });
              break;
            case 'age':
              rows.push({
                key: 'Age',
                value: value as number,
              });
              break;
            case 'address':
              const address = value as Address;
              const addressString = formatAddress(address);
              rows.push({
                key: 'Address',
                value: addressString,
              });
              break;
            case 'phoneNumber':
              const phoneNumber = formatPhoneNumber(value.toString());
              rows.push({
                key: 'Phone Number',
                value: phoneNumber as string,
              });
              break;
            case 'isPrimary':
              rows.push({
                key: 'Primary',
                value: value ? 'Yes' : 'No',
              });
              break;
            default: {
              break;
            }
          }
        });
        return rows;
      });
      return policyholderRows;
    },
  });
};
