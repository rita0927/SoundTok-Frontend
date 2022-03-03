import React, {useState, useEffect} from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import Song from './Song.jsx';
import Draft from './Draft.jsx';
// import dummySongs from './dummySongs.jsx';
// import dummyDrafts from './dummyDrafts.jsx';
import styled from 'styled-components';
const axios = require('axios');

const Button = styled.button`
  color: rgb(255, 250, 206);
  border: 2px solid rgb(255, 250, 206);
  margin: 0px 10px;
  padding: 2px 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  max-height: 700px;
  width: 1000px;
  margin-top: 10px;
  flex-wrap: wrap;
  overflow-y: auto;
`;

// const UserPosts = ({isCurrentUser}) => {
const UserPosts = ({isCurrentUser, setIsCurrentUser, profileName}) => {
  // const { user } = useAuth();
  const [tab, setTab] = useState('Posts');
  const [songs, setSongs] = useState([]);
  const [drafts, setDrafts] = useState([]);
  // const {projectsToDelete, setProjectsToDelete} = useState([]); - stretch goal - delete multiple songs
  const [username, setUsername] = useState('leggo'); //update with Context when available
  // const [currentEndpoint, setCurrentEndpoint] = useState('test');


  const removePost = (postId, source) => {
    // needs call to remove from db. stretch goal - select and remove multiple songs
    // to-dos: add confirmation popup, add select boxes to select multiple songs before clicking a separate delete button
    // cut this section after post request is implemented
    //Modifying directly in state instead of waiting for response for faster user experience

    // console.log(postId);
    // console.log('source,', source);
    if (source === 'Posts') {
      setSongs(songs.filter(song => song.postId !== postId));
    } else {
      setDrafts(drafts.filter(draft => draft.postId !== postId));
    }

    // axios.post('/deleteProjects', projectsToDelete)
    let postToRemove = {
      postId: postId
    };

    // axios.delete('/deletePost', {data: formData})
    axios.delete('/deletePost', {data: postToRemove})
      .then(function (response) {
        console.log('Project successfully deleted');
      })
      .catch(function (error) {
        //pop-up with with message - please review error and try again
        // console.log('Project failed to delete. Please refresh the page and try again');
        console.log(error);
      });
  };

  useEffect(() => {
    let location = window.location.href;
    let userProfile = location.slice((window.location.href.indexOf('profile') + 8));

    if (userProfile !== '') {
      setUsername(userProfile);
    } else {
      userProfile = username;
      setIsCurrentUser(true);
    }
    // setUsername(userProfile);
    // console.log('searching for: ', userProfile);

    // axios.get(`/profile/${profileName}`, {
    axios.get(`/profile`, {
      params: {
        // username: 'leggo'
        username: userProfile
      }
    })
      .then((response) => {
        let songList = [];
        let draftList = [];

        for (let song of response.data.projectdata) {
          console.log(song);
          if (song.draft) {
            songList.push(song);
          } else {
            draftList.push(song);
          }
        }

        setSongs(songList);
        setDrafts(draftList);
        // setSongs(response.data.projectdata);
      })
      .catch((err) => {
        console.log(err);
      });


    // if (isCurrentUser) {  //update after team sets up sample draft data
    //   axios.get('/userDrafts', {
    //     params: {
    //       username: profileName
    //     }
    //   })
    //     .then((response) => {
    //       // setDrafts(response.data);
    //       console.log('response: ', response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  }, [profileName]);
  // }, [currentEndpoint]);

  return (
    <>
      <ButtonWrapper>
        <Button onClick={() => setTab('Posts')} >Posts</Button>
        {isCurrentUser ?
          <Button onClick={() => setTab('Drafts')}>Drafts</Button>
          : null}
      </ButtonWrapper>
      {/* <p>User from context: {user}</p> */}
      <PostWrapper>
        {((tab === 'Posts' || !isCurrentUser) && songs !== undefined) ? songs.map((song, i) => {
          return (
            <Song
              key={i}
              postId={song.postId}
              projectImageLink={song.projectImageLink}
              projectTitle={song.projectTitle}
              songDescription={song.projectDescription}
              projectAudioLink={song.projectAudioLink}
              projectLength={song.projectLength}
              tags={song.tags}
              removeSong={removePost}
              isCurrentUser={isCurrentUser}
            ></Song>
          );
        }) : null}
        {(tab === 'Drafts' && isCurrentUser && drafts !== undefined) ? drafts.map((draft, i) => {
          return (
            <Draft
              key={i}
              postId={draft.postId}
              username={draft.username}
              // projectImageLink={draft.projectImageLink}
              projectTitle={draft.projectTitle}
              songDescription={draft.projectDescription}
              projectAudioLink={draft.projectAudioLink}
              projectLength={draft.projectLength}
              tags={draft.tags}
              removeDraft={removePost}
            ></Draft>
          );
        }) : null}
      </PostWrapper>
    </>
  );
};

export default UserPosts;

