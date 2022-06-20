import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderRouter } from "./../../helper/renderAllComponents";
import { dataTestIds } from "./../../utils/dataTestIds";
import { home } from '../../../utils/pages/pages';

describe("Home Page", () => {
  test('Count pages', async () => {
    renderRouter({ initialRoute: [home.path] });

    await waitFor(() => {
      const countPages = screen.getAllByTestId(dataTestIds.paginationBtn).length;
      expect(countPages).toEqual(2);
    });
  });

  test('Count cards', async () => {
    renderRouter({ initialRoute: [home.path] });

    await waitFor(() => {
      const countCards = screen.getAllByTestId(dataTestIds.postCard).length;
      expect(countCards).toEqual(5);
    });
  });

  test('check header on ligin btn', async () => {
    renderRouter({ initialRoute: [home.path] });

    const loginLink = screen.getByTestId(dataTestIds.loginLink);
    expect(loginLink).toBeInTheDocument();
  });
})
