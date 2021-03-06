import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import UserProfile from '../components/profile/UserProfile.jsx';
import UserPosts from '../components/profile/UserPosts.jsx';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading.jsx';
import { useUserInfo } from '../contexts/UserContext.jsx';


import styled from 'styled-components';


const ProfileWrapper = styled.div`
  display:flex;
  width: 100%;
  overflow: scroll;
  justify-content: center;
  height: calc(100% - 95px);
`;

const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 1000px;
  border-left: solid 1px;
  border-right: solid 1px;
  background: var(--main-color-black);
  border-color: var(--font-line-color-yellow-transparent);
  min-height: 100%;
`;

const Profile = () => {
  // const { user } = useAuth();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [profileName, setProfileName] = useState('testName');
  const { email, username } = useUserInfo();
  // const { email, username, isNewProfile, setIsNewProfile } = useUserInfo();
  let location = useLocation();

  useEffect(() => {
    // console.log('user email', email); //this is the logged in username
    // console.log('user name', username); //this is the logged in username

    setProfileName(location.pathname.split('/').pop());
    if (location.pathname.split('/').pop() === username) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  //Added username so user can edit profile/view drafts after being authenticated. Previously
  //refreshing the profile page would remove editing privileges
  }, [location, username]);

  //Nested routes
  return (
    <>
      {/* <h1>Profile Page</h1>
      <p>User from context: {user}</p> */}

      <ProfileWrapper>
        <ProfilePage>
          <UserProfile
            isCurrentUser={isCurrentUser}
            setIsCurrentUser={setIsCurrentUser}
            profileName={profileName}
            setProfileName={setProfileName}
          ></UserProfile>
          <UserPosts
            isCurrentUser={isCurrentUser}
            setIsCurrentUser={setIsCurrentUser}
            profileName={profileName}
          ></UserPosts>
        </ProfilePage>
      </ProfileWrapper>

      <Routes>
        <Route path="userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
