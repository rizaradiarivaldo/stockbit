import React, { useEffect } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { GET_DETAILS } from "../../redux/actions/movies";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const detailMovie = useSelector((state) => state.movies);
  const { Poster } = detailMovie.detail;

  useEffect(() => {
    dispatch(GET_DETAILS(id));
  }, []);
  return (
    <Container>
      {detailMovie.isLoading ? (
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col md={12} style={{ textAlign: "center" }}>
              {/* <img src={""} alt="" /> */}
              <Image src={Poster} alt="poster" fluid />
            </Col>
          </Row>
          {Object.entries(detailMovie.detail).map((item, index) => {
            if (item[0] === "Ratings") {
              return (
                <Row className="mt-3">
                  <Col md={{ span: 3, offset: 3 }}>
                    <strong>{item[0]}</strong>
                  </Col>
                  <Col md={6}>
                    {item[1].map((i, x) => {
                      return (
                        <>
                          <p>{i.Source}</p>
                          <ul>
                            <li>{i.Value}</li>
                          </ul>
                        </>
                      );
                    })}
                  </Col>
                </Row>
              );
            } else if (
              item[0] !== "Ratings" &&
              item[0] !== "Poster" &&
              item[0] !== "Response" &&
              item[0] !== "Response"
            ) {
              return (
                <Row className="mt-3">
                  <Col md={{ span: 3, offset: 3 }}>
                    <strong>{item[0]}</strong>
                  </Col>
                  <Col md={6}>{item[1]}</Col>
                </Row>
              );
            }
          })}
        </>
      )}
    </Container>
  );
};

export default Detail;
