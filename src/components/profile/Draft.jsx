import React from "react";
// import { useAuth } from '../../contexts/AuthContext.jsx';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { usePosts } from "../../contexts/PostsContext.jsx";

const SingleDraft = styled.div`
  width: 30%;
  height: 140px;
  padding: 16px;
  margin: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid var(--font-line-color-yellow-transparent);
`;

const DraftHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const PostRemixButton = styled.button`
  color: var(--font-line-color-yellow-transparent);
  font-size: 16px;

  &:hover {
    color: var(--font-line-color-yellow);
  }
`;

const DeleteButton = styled.button`
  &:hover {
    color: red;
  }
  padding-bottom: 10px;
`;

const LogoButton = styled.button``;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-line-color-yellow);
`;

const DraftText = styled.p``;

const Draft = (props) => {
  const { setSelectedProjectId } = usePosts();
  // const { user } = useAuth();
  const deleteDraft = () => {
    // Stretch goal - add confirmation popup
    props.removeDraft(props.postId, "Drafts");
  };
  //possibly make song image the background

  const convertSongLength = (seconds) => {
    let length;
    if (seconds < 60) {
      length = seconds + "s";
    } else {
      let min = Math.floor(seconds / 60);
      let sec = Math.floor(seconds % 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      length = min + ":" + sec;
    }
    return length;
  };

  return (
    <SingleDraft>
      <DraftHeader>
        {/* <LogoButton>
          <Logo src={props.projectImageLink}></Logo>
        </LogoButton> */}
        <DraftText>{convertSongLength(props.projectLength)}</DraftText>
        <Link to={'/studio'}>
          <PostRemixButton onClick={() => setSelectedProjectId(props.postId)}>
            <i className="ri-sound-module-line"></i>
          </PostRemixButton>
        </Link>
        <DeleteButton onClick={() => deleteDraft()}>X</DeleteButton>
      </DraftHeader>
      <DraftText>{props.projectTitle}</DraftText>
      <DraftText role='draftTitle'>{props.songDescription}</DraftText>
    </SingleDraft>
  );
};

export default Draft;
