import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router";
const Cards = (props) => {
  const { Poster, Title, Type, Year, imdbID, handleShow } = props.data;

  const history = useHistory();
  return (
    <Card>
      <Card.Img
        variant="top"
        src={Poster}
        onClick={() => handleShow(Poster)}
        style={{ cursor: "pointer" }}
      />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Year}</Card.Text>
        <Card.Text>{Type}</Card.Text>
        <Button
          variant="primary"
          onClick={() => history.push(`/detail/${imdbID}`)}
        >
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
};
export default Cards;
