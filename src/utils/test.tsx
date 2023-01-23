import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { generateQueryClient } from '../react-query/queryClient';

export const renderWithProviders = (
  ui: ReactElement,
  opts: Partial<Parameters<typeof render>[1]> = {}
) => render(<BrowserRouter>{ui}</BrowserRouter>, opts);

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

export const createQueryClientWrapper = () => {
  const queryClient = generateTestQueryClient();
  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
