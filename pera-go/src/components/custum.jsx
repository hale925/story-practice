import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, Button, Collapse, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';



const PositionTree = () => {
  const [positions, setPositions] = useState([]);
  const [expand, setExpand] = useState({});
  


  const [isHierarchyOpen, setIsHierarchyOpen] = useState(false);
  const toggleHierarchy = () => setIsHierarchyOpen(!isHierarchyOpen);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://6583de3b4d1ee97c6bce6c82.mockapi.io/tree');
      setPositions(response.data);
    } catch (error) {
      console.log("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExpandToggle = (positionName) => {
    setExpand((prevExpand) => ({
      ...prevExpand,
      [positionName]: !prevExpand[positionName],
    }));
  };

  const renderPosition = () => {
    const topLevelPositions = positions.filter((position) => position.parentId === null);

    return topLevelPositions.map((topLevelPosition) => {
      return (
        <List key={topLevelPosition.id}>
          <ListItem>
            <Button className='px-2 hover:bg-green-700' 
            onClick={() => handleExpandToggle(topLevelPosition.name)}>
              H</Button>
            
            <Link to={`/positions/${topLevelPosition.name}`}> 
            <Anchor className="py-2 px-2 w-full hover:bg-gray-700">
              {topLevelPosition.name}</Anchor>
            </Link>
          </ListItem>
          <Collapse in={expand?.[topLevelPosition.name]}>
            {renderChildPositions(topLevelPosition.name)}
          </Collapse>
        </List>
      );
    });
  };

  const renderChildPositions = (parentId, indentLevel = 1) => {
    const children = positions.filter((position) => position.parentId === parentId);

    return (
      <List withPadding style={{ paddingLeft: `${indentLevel * 5}px` }}>
        {children.map((child) => (
          <ListItem key={child.id}>
            <Button 
            className='px-2 hover:bg-green-700' 
            onClick={() => handleExpandToggle(child.name)}>H</Button>
            
            <Link to={`/positions/${child.name}`}> 
            <Anchor className="py-2 px-2 w-full hover:bg-gray-700">
            {child.name}</Anchor>
            </Link>
            <Collapse in={expand?.[child.name]}>
              {renderChildPositions(child.name, indentLevel + 1)}
            </Collapse>
          </ListItem>
        ))}
      </List>
    );
  };


  return (
    <div>
      <Button 
      className='py-3 px-2 hover:bg-gray-700'
      onClick={toggleHierarchy}>
        Position Hierarchy</Button>
      {isHierarchyOpen && (<List>{renderPosition()}</List>)}
      
      
    </div>
  );
};

export default PositionTree;
