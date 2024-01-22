import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  white-space: nowrap;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.a`
  color: black;
  
  text-decoration: none;
  display: block;

  &:hover {
    background-color: blue;
    color: white;
  }
`;

const DropdownButton = styled.div`
  padding: 1vw;
  border: 1px solid #ccc;
  cursor: pointer;
`;

DropdownButton.displayName = "DropdownButton";
DropdownContent.displayName = "DropdownContent";



const DropdownComp = ({ dropdownItems }) => { // 매개변수 이름을 dropdownItems로 변경
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <Dropdown ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>Select an Item</DropdownButton>
      {isOpen && (
        <DropdownContent>
          {dropdownItems.map((item, index) => (
            <DropdownItem key={index} href="#">
              {item.name} 
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </Dropdown>
  );
};

export default DropdownComp;