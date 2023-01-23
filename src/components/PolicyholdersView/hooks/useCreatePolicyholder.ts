import { axiosRequest } from '../../../axiosInstance/index';
import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { Policyholder } from '../types/types';
import { unionWith, isEqual } from 'lodash';

async function createPolicyholder(
  policyholder: Policyholder
): Promise<Policyholder[]> {
  const { data } = await axiosRequest({
    url: '/api/policyholders',
    method: 'post',
    data: policyholder,
  });
  return data.policyHolders;
}

export const useCreatePolicyholder = (): UseMutationResult<
  Policyholder[],
  unknown,
  Policyholder,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation(createPolicyholder, {
    onSuccess: (data): void => {
      queryClient.setQueryData<Policyholder[]>(
        'policyholders',
        (oldQueryData): Policyholder[] => {
          return unionWith(oldQueryData, data, isEqual);
        }
      );
    },
  });
};
