import PolicyholdersView from './PolicyholdersView';
import { renderWithQueryClient } from '../../utils/test';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../mocks/server';

describe('PolicyholdersView', () => {
  it('Renders Error icon when server response with error', async () => {
    server.use(
      rest.get(
        'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );

    const { getByTestId } = renderWithQueryClient(<PolicyholdersView />);

    const hourglassBottomIcon = getByTestId('HourglassBottomIcon');
    expect(hourglassBottomIcon).toBeInTheDocument();

    await waitFor(() => {
      const errorIcon = getByTestId('ErrorIcon');
      expect(errorIcon).toBeInTheDocument();
    });
  });
});
