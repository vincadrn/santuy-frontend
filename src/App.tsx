import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import LandingPage from './UI/LandingPage';
import LoginPage from './UI/LoginPage';
import { OAuthPage } from './UI/LoginPage';
import Album from './UI/Album/Album';
import TripImageAlbumList from './UI/Album/ListAlbum';
import FinancePage from './UI/FinancePage';
import PersonalStuffPage from './UI/PersonalStuff/PersonalStuff';
import ListStuff from './UI/PersonalStuff/PersonalListStuff';
import PersonalFinancePage from './UI/PersonalStuff/PersonalFinance';
import JoinCreateGroup from './UI/Group/JoinCreateGroup';
import InsertGroupCodePage from './UI/Group/InsertCode';
import CreateGroupForm from './UI/Group/CreateGroupPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2647',
    },
  },
});

const App = () => {
  return (
    <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/join-create-group" element={<JoinCreateGroup />} />
              <Route path="/join-create-group/insert-code" element={<InsertGroupCodePage />} />
              <Route path="/join-create-group/create-group" element={<CreateGroupForm />} />
              <Route path="/oauth2" element={<OAuthPage />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/album" element={<Album />} />
              <Route path="/album/:day" element={<TripImageAlbumList />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/personal-stuff" element={<PersonalStuffPage />} />
              <Route path="/personal-stuff/list" element={<ListStuff />} />
              <Route path="/personal-stuff/finance" element={<PersonalFinancePage />} />
            </Routes>
          </Router>
        </ThemeProvider>
    </div>
   
  );
};

export default App;
