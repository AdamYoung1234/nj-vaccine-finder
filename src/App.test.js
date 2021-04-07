import App from './App';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

describe('app', () => {
  it('should have a loading screen', async () => {
    render(<App />);

    const loader = screen.getByText('Finding Available Appointments');
    expect(loader).toBeVisible();

    await waitForElementToBeRemoved(
      () => screen.getByText('Finding Available Appointments'),
      {
        timeout: 5000,
      }
    );
  });

  it('should have a visible header', async () => {
    render(<App />);
    await waitForElementToBeRemoved(
      () => screen.getByText('Finding Available Appointments'),
      {
        timeout: 5000,
      }
    );

    const header = screen.getByText('New Jersey COVID-19 Vaccine Finder');
    expect(header).toBeVisible();
  });

  it('should have a visible footer', async () => {
    render(<App />);
    await waitForElementToBeRemoved(
      () => screen.getByText('Finding Available Appointments'),
      {
        timeout: 20000,
      }
    );

    const footer = screen.getByText(
      '\u00A9 Chen Yang. Powered by React & Semantic UI.'
    );
    expect(footer).toBeVisible();
  });
});
