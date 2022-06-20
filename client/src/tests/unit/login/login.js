import '@testing-library/jest-dom/extend-expect';
import { renderRouter } from "./../../helper/renderAllComponents";
import { home } from "./../../../utils/pages/pages";

describe("Home", () => {
  test('load page', async () => {
    renderRouter(home.path);
    
  });
})
