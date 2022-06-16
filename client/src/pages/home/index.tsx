import { useCallback, useState } from 'react';
import "./home.css";
import { Pagination } from '../../components/pagination/pagination';
import { Container, ErrorMsg, Header, Loader, PostCard, Search } from './../../components';
import { postAPI } from '../../services/postAPI.service';
import { useAppSelector } from '../../hooks/redux';
import { ESort } from './home.interfaces';
import { SortPanel } from '../../components/sortPanel/sortPanel';

export default function Home(): JSX.Element {
  const [sort, setSort] = useState<ESort>(ESort.DATE);
  const [sortType, setSortType] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const { data: posts, error, isLoading } = postAPI.useFetchPostsQuery({ page, search, sort, sortType });
  const prefetchPage = postAPI.usePrefetch('fetchPosts');
  const prefetchPost = postAPI.usePrefetch('fetchPostById');

  const { error: authError } = useAppSelector(state => state.auth);

  const prefetchHoverPage = useCallback((hoverPage: number) => {
    prefetchPage({ page: hoverPage, search, sort, sortType })
  }, [prefetchPage, search, sort, sortType]);

  const searchHandler = (search: string) => {
    setPage(1);
    setSearch(search);
  }

  const handleError = (): string => {
    if(authError) return authError as string;
    if(error) return (error as any).error as string;

    return "Smth went worng on home page :(";
  }
  
  return (
    <>
       <Header />
       <Container>
         <div className="postsBlockWrapper">
          {error && <ErrorMsg>{handleError()}</ErrorMsg>}
          {isLoading && <Loader />}
          <Search isLoading={isLoading} searchHandler={searchHandler} />
          <SortPanel sort={sort} setSort={setSort} sortType={sortType} setSortType={setSortType} />
          {!isLoading && posts && 
            <div className="postsBlock">
              {
                posts.posts.map(post => 
                  <PostCard 
                    key={post._id} 
                    post={post}
                    onMouseEnter={() => prefetchPost(post._id)}
                  />)
              }
            </div>
          }
          {
          posts 
            && posts.count > 0 
            && <Pagination 
                  count={posts.count} 
                  currentPage={page} 
                  setPage={setPage}
                  prefetchHoverPage={prefetchHoverPage}
                />
          }
         </div>
      </Container>
    </>
  )
}
