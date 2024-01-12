import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Col, Container, Grid, Row } from '@mantine/core';

const PositionContent = () => {
  const { path } = useParams();
  const { positions } = useSelector((state) => state.positions);
  const history = useHistory();

  // Fetched position directly from Redux state
  const fetchedPosition = positions.find((position) => position.name === path.split('/').pop());

  const goBack = () => {
    history.goBack(); // Use history.goBack() to navigate back
  };

  return (
    <Container>
      <header className="py-4">
        <Grid>
          <Row>
            <Col span={6}>
              <Button component={Link} to="/" className="text-left" onClick={goBack}>
                Back
              </Button>
            </Col>
            <Col span={6} className="text-right">
              <Button>{path}</Button>
            </Col>
          </Row>
        </Grid>
      </header>
      <main className="mt-8">
        {fetchedPosition ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{fetchedPosition.name}</h1>
            <p className="text-lg mb-2">
              Department: {fetchedPosition.parentId ? fetchedPosition.parentId : 'Not specified'}
            </p>
            <p className="text-lg mb-4">Description: {fetchedPosition.description}</p>
            <hr className="border-t-2 border-gray-300" />
          </div>
        ) : (
          <p className="text-lg">Position not found</p>
        )}
      </main>
    </Container>
  );
};

export default PositionContent;
