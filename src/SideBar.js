import React, { useState } from "react";
import styled, { css } from "styled-components";
import { CiCircleList } from "react-icons/ci";
import { LuMenuSquare } from "react-icons/lu";
import Modal from "./Modal";

const SideBarContainer = styled.div`
  background-color: #cbd5e0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 16rem;
`;

const Section = styled.div`
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  background-color: #ffffff;
`;

const ProfileSection = styled(Section)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
`;

const Greeting = styled.div`
  color: #2d3748;
`;

const GreetingTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const GreetingSubtitle = styled.p`
  color: #4a5568;
`;

const ToggleSection = styled(Section)``;

const ToggleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const ToggleButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ToggleButton = styled.div`
  padding: 0.5rem;
  background-color: ${(props) => (props.active ? "#e2e8f0" : "#edf2f7")};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  box-shadow: ${(props) => (props.active ? "0 0 0 2px #4a5568" : "none")};

  &:hover {
    background-color: #e2e8f0;
  }
`;

const Icon = styled.div`
  color: ${(props) => (props.active ? "#4a5568" : "#2d3748")};
  font-size: 1.5rem;
`;

const FeedbackSection = styled(Section)`
  color: #2d3748;
`;

const FeedbackTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const FeedbackSubtitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #4a5568;
`;

const FeedbackButton = styled.button`
  background-color: #3182ce;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #2b6cb0;
  }
`;

function SideBar({ onViewChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("box"); // Default view mode

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleViewChange = (mode) => {
    setActiveView(mode);
    onViewChange(mode); // Notify App to change the view mode
  };

  return (
    <>
      <SideBarContainer>
        <ProfileSection>
          <ProfileImage src="https://picsum.photos/200/300" alt="Random" />
          <Greeting>
            <GreetingTitle>Hi Reader,</GreetingTitle>
            <GreetingSubtitle>Here's Your news</GreetingSubtitle>
          </Greeting>
        </ProfileSection>

        <ToggleSection>
          <ToggleTitle>View Toggle</ToggleTitle>
          <ToggleButtons>
            <ToggleButton
              onClick={() => handleViewChange("box")}
              active={activeView === "box"}
            >
              <Icon active={activeView === "box"}>
                <LuMenuSquare />
              </Icon>
            </ToggleButton>
            <ToggleButton
              onClick={() => handleViewChange("list")}
              active={activeView === "list"}
            >
              <Icon active={activeView === "list"}>
                <CiCircleList />
              </Icon>
            </ToggleButton>
          </ToggleButtons>
        </ToggleSection>

        <FeedbackSection>
          <FeedbackTitle>Have a Feedback?</FeedbackTitle>
          <FeedbackSubtitle>We’re listening</FeedbackSubtitle>
          <FeedbackButton onClick={openModal}>Give Feedback</FeedbackButton>
        </FeedbackSection>
      </SideBarContainer>

      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}

export default SideBar;
