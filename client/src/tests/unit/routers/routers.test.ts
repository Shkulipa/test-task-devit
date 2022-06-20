import { screen, waitFor, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { dataTestIds } from '../../utils/dataTestIds';
import { home } from '../../../utils/pages/pages';
import { renderRouter } from '../../helper/renderAllComponents';
import userEvent from '@testing-library/user-event';

describe("Routers", () => {
  test('loader of pages', async () => {
    renderRouter({ initialRoute: [home.path] });

    const loader = screen.getByTestId(dataTestIds.loader);
    expect(loader).toBeInTheDocument();

    await waitForElementToBeRemoved(loader);
  });

  test('check login link', async () => {
    renderRouter({ initialRoute: [home.path] });
    
    let loginLink: HTMLElement | undefined = undefined;;
    await waitFor(() => {
      loginLink = screen.getByTestId(dataTestIds.loginLink);
      expect(loginLink).toBeInTheDocument();
    });

    userEvent.click(loginLink!);

    await waitFor(() => {
      const emailInput = screen.getByTestId(dataTestIds.emailInput);
      expect(emailInput).toBeInTheDocument();
    });
  
    await waitFor(() => {
      const passwordInput = screen.getByTestId(dataTestIds.passwordInput);
      expect(passwordInput).toBeInTheDocument();
    });
    
    await waitFor(() => {
      const loginBtn = screen.getByTestId(dataTestIds.loginBtn);
      expect(loginBtn).toBeInTheDocument();
    });

    await waitFor(() => {
      const homeLink = screen.getByTestId(dataTestIds.homeLink);
      expect(homeLink).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(loginLink).not.toBeInTheDocument();
    });
  });

  test('check a post page', async () => {
    renderRouter({ initialRoute: [home.path] });

    let cards: HTMLElement[] = [];
    await waitFor(() => {
      cards = screen.getAllByTestId(dataTestIds.readMore);
    });
  
    fireEvent.click(cards[0]);

    await waitFor(() => {
      const content = screen.getByTestId(dataTestIds.contentPostPage);
      expect(content).toBeInTheDocument();
    });

    await waitFor(() => {
      const loginLink = screen.getByTestId(dataTestIds.loginLink);
      expect(loginLink).toBeInTheDocument();
    });

    await waitFor(() => {
      const homeLink = screen.getByTestId(dataTestIds.homeLink);
      expect(homeLink).toBeInTheDocument();
    });
  });
})
