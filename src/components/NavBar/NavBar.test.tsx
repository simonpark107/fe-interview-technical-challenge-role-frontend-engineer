import NavBar from './NavBar';
import { renderWithProviders } from '../../utils/test';

describe('NavBar', () => {
  const defaultProps = {
    links: [
      { text: 'Link1', href: '/link1' },
      { text: 'Link2', href: '/link2' },
      { text: 'Link3', href: '/link3' },
    ],
  };

  it('should render NavBar links', () => {
    const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

    expect(getByText('Link1')).toBeInTheDocument();
    expect(getByText('Link2')).toBeInTheDocument();
    expect(getByText('Link3')).toBeInTheDocument();
  });

  it('should render an `href` attribute for each link', () => {
    const { getAllByRole } = renderWithProviders(<NavBar {...defaultProps} />);
    const links = getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/link1');
    expect(links[2]).toHaveAttribute('href', '/link2');
    expect(links[3]).toHaveAttribute('href', '/link3');
  });
});
