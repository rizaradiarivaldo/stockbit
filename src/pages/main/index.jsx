import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import { GET_ALL_MOVIES } from "../../redux/actions/movies";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card";

import ModalComp from "../../components/modal";

const Main = () => {
  const movies = useSelector((state) => state.movies);
  const observer = useRef();

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [poster, setPoster] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const lastElementBottom = useCallback((node) => {
    if (movies.isLoading) return;
    if (observer.current) observer.current.disconnect();
    let _page = page;
    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        movies.isLoading === false &&
        isLoading === false
      ) {
        setIsLoading(true);
        _page = _page + 1;
        console.log(_page);
        setTimeout(() => {
          setPages(_page);
        }, 500);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const setPages = (numPage) => {
    setIsLoading(false);
    setPage(numPage);
    console.log(numPage);
    getData(numPage);
  };
  const handleClose = () => setShow(false);

  const handleShow = (poster) => {
    setShow(true);
    setPoster(poster);
  };

  const btnSearch = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(GET_ALL_MOVIES({ title, page: 1 }));
  };

  const getData = (a) => {
    dispatch(GET_ALL_MOVIES({ title, page: a }));
  };

  useEffect(() => {
    getData(1);
  }, []);
  return (
    <>
      <Container>
        {/* title with input */}
        <Row className="mt-4">
          <Col xs={6} md={6}>
            List Movies
          </Col>
          <Col xs={6} md={{ span: 3, offset: 3 }}>
            <Form>
              <InputGroup>
                <FormControl
                  placeholder="Search Title"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="outline-primary"
                  id="btnSearch"
                  onClick={(e) => btnSearch(e)}
                >
                  Button
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        {/* end title with input */}

        <Row>
          {movies.data.length > 0 ? (
            movies.data.map((item, index) => {
              if (movies.data.length === index + 1 && movies.data.length > 5) {
                return (
                  <Col
                    ref={lastElementBottom}
                    xs={6}
                    md={3}
                    className="p-3"
                    key={index}
                  >
                    <Card data={{ ...item, handleShow }} />
                  </Col>
                );
              } else {
                return (
                  <Col xs={6} md={3} className="p-3" key={index}>
                    <Card data={{ ...item, handleShow }} />
                  </Col>
                );
              }
            })
          ) : (
            <Col className="text-center">Data tidak ditemukan</Col>
          )}
          <ModalComp data={{ show, handleClose, poster }} />
        </Row>
        {movies.isLoading && isLoading && (
          <Row>
            <Col className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};
export default Main;
