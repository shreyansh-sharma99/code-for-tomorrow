import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchPosts, removePost } from "./postSlice";
import ReactPaginate from "react-paginate";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; 
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow-y: auto;
`;


const PostItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;


const Body = styled.p`
  margin: 0;
  color: #555;
`;


const Button = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c53030;
  }
`;


const StatusMessage = styled.div`
  text-align: center;
  color: ${(props) => (props.error ? "#e53e3e" : "#4a5568")};
  font-size: 1.125rem;
  margin: 1rem 0;
`;


const Pagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  .pagination__item {
    margin: 0 0.25rem;
    cursor: pointer;
  }

  .pagination__link {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
  }

  .pagination__link--active {
    background-color: #e53e3e;
    color: #fff;
  }
`;


const PostListComponent = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 6;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleRemovePost = (postId) => {
    dispatch(removePost(postId));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);
  const pageCount = Math.ceil(posts.length / postsPerPage);

  if (status === "loading") {
    return <StatusMessage>Loading...</StatusMessage>;
  }

  if (status === "failed") {
    return <StatusMessage error>Error: {error}</StatusMessage>;
  }

  return (
    <Container>
      <PostList>
        {currentPosts.map((post) => (
          <PostItem key={post.id}>
            <Button onClick={() => handleRemovePost(post.id)}>❌</Button>
            <Title>{post.title}</Title>
            <Body>{post.body}</Body>
          </PostItem>
        ))}
      </PostList>
      <Pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"pagination__item"}
        pageLinkClassName={"pagination__link"}
        previousClassName={"pagination__item"}
        previousLinkClassName={"pagination__link"}
        nextClassName={"pagination__item"}
        nextLinkClassName={"pagination__link"}
        breakClassName={"pagination__item"}
        breakLinkClassName={"pagination__link"}
        activeClassName={"pagination__link--active"}
      />
    </Container>
  );
};

export default PostListComponent;
