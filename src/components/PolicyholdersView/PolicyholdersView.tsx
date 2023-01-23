import InfoTable from '../InfoTable';
import { Button, Box } from '@mui/material';
import { usePolicyholders } from './hooks/usePolicyholders';
import { useCreatePolicyholder } from './hooks/useCreatePolicyholder';
import { Error, HourglassBottom } from '@mui/icons-material';
import { newPolicyholder } from '../../constants/newPolicyholder';
import { Rows } from './types/types';

function PolicyholdersView() {
  const { data, isLoading, isError, isFetching } = usePolicyholders();
  const { mutate } = useCreatePolicyholder();

  if (isLoading || isFetching) {
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
