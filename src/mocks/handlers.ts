import { rest } from 'msw';

import { mockNewPolicyholder } from './mockData';

export const handlers = [
  rest.get(
    'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockNewPolicyholder));
    }
  ),
];
