import InfoTable from '../InfoTable';
import { Button, Box } from '@mui/material';
import { usePolicyholders } from './hooks/usePolicyholders';
import { useCreatePolicyholder } from './hooks/useCreatePolicyholder';
import { Error, HourglassBottom } from '@mui/icons-material';
import { newPolicyholder } from '../../constants/newPolicyholder';
import { Rows } from './types/types';

function PolicyholdersView() {
  const { data, isLoading, isError } = usePolicyholders();
  const { mutate } = useCreatePolicyholder();

  if (isLoading) {
    return (
      <div>
        <HourglassBottom />
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Error />
        Error connecting to server...
      </div>
    );
  }

  const handleCreatePolicyholder = (): void => {
    mutate(newPolicyholder);
  };

  return (
    <Box>
      {data &&
        data.map((rows: Rows) => {
          return (
            <InfoTable
              header={`Policyholder #${data.indexOf(rows) + 1}`}
              rows={rows}
              sx={{ marginBottom: '50px' }}
              key={data.indexOf(rows)}
            />
          );
        })}
      <Box
        sx={{
          paddingTop: '16px',
          textAlign: 'center',
        }}
      >
        <Button
          onClick={() => handleCreatePolicyholder()}
          variant="contained"
          color="secondary"
          size="medium"
        >
          Add a policyholder
        </Button>
      </Box>
    </Box>
  );
}

export default PolicyholdersView;

// TODO:
// Better loading & error handling for better user experience
// Handle if there are 0 policyholders
// Disable "Add a policyholder" button or show a message if you can't add anymore policyholders
// Implement infinite scroll (useInfiniteQuery) or pagination if able to write to database
// Implement optimistic update
// Should be able to delete & update a policyholder
// Create a succeess, loading, and error message for creating, updating, and deleting a policyholder
// Create search input to filter policyholders by their key/value
// Create a modal form to create & update policyholders and use form validation.
// Create a confirmation message (toast) when deleting a policyholder
// Create a way to delete multiple policyholders
// Add more testing for PolicyholdersView, useQuery, and useMutation.
// Mobile responsiveness
