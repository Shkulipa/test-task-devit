import { useLocation, Link, useNavigate  } from "react-router-dom";
import { Button, Container } from "..";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logoutAsync } from "../../store/actions/logout";
import { dataTestIds } from "../../tests/utils/dataTestIds";
import { home, login, postCreate, postUpdate } from './../../utils/pages/pages';
import './header.css';

export function Header(): JSX.Element {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(state => state.auth);
  const path = location.pathname;

  const logoutHandler = () => {
    /**
     * @info
     * when you log out of your account, 
     * there will be a redirect only if the yucher is on the pages for creating or updating a post
     */
    if(
      path.includes(postCreate.path) || 
      path.includes(postUpdate.path.split('/:id')[0])
    ) history('/');

    dispatch(logoutAsync());
  }

  const logoutBtn = 
    <Button
      onClick={logoutHandler}
      className={"logout-btn"} 
      disabled={isLoading}
      data-testid={dataTestIds.logoutLink}
    >
      {isLoading ? "isLoading..." : "logout" }
    </Button>
  
  return (
    <header>
      <Container>
        <nav>
          {path !== home.path && <Link to={home.path} data-testid={dataTestIds.homeLink}>Home</Link>}
          {path !== login.path && !user && <Link to={login.path} data-testid={dataTestIds.loginLink}>Login Admin</Link>}

          {path !== postCreate.path && user && <Link to={postCreate.path} data-testid={dataTestIds.createPost}>Create Post</Link>}
          {user && logoutBtn}
        </nav>
      </Container>
    </header>
  )
}
