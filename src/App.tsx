import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import ItineraryPage from './UI/ItineraryPage';
import LoginPage from './UI/LoginPage';
import { OAuthPage } from './UI/LoginPage';
import Album from './UI/Album/Album';
import TripImageAlbumList from './UI/Album/ListAlbum';
import GroupBudgetPage from './UI/Finance/GroupBudgetPage';
import PersonalStuffPage from './UI/PersonalStuff/PersonalStuff';
import PersonalListStuff from './UI/PersonalStuff/PersonalListStuff';
import PersonalFinancePage from './UI/PersonalStuff/PersonalFinance';
import JoinCreateGroup from './UI/Group/JoinCreateGroup';
import InsertGroupCodePage from './UI/Group/InsertCode';
import CreateGroupForm from './UI/Group/CreateGroupPage';
import SpendingPage from './UI/Finance/SpendingPage';
import NotFoundPage from './UI/NotFound';
import HomePage from './UI/HomePage';
import LogoutPage from './UI/LogoutPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2647',
    },
  },
});

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join-create-group" element={<JoinCreateGroup />} />
                <Route path="/join-create-group/insert-code" element={<InsertGroupCodePage />} />
                <Route path="/join-create-group/create-group" element={<CreateGroupForm />} />
                <Route path="/oauth2" element={<OAuthPage />} />
                <Route path="/itinerary" element={<ItineraryPage />} />
                <Route path="/album" element={<Album />} />
                <Route path="/album/:day" element={<TripImageAlbumList key={location.pathname} />} />
                <Route path="/finance/group-budget" element={<GroupBudgetPage />} />
                <Route path="/finance/group-spending" element={<SpendingPage />} />
                <Route path="/personal-stuff" element={<PersonalStuffPage />} />
                <Route path="/personal-stuff/list" element={<PersonalListStuff />} />
                <Route path="/personal-stuff/personal-finance" element={<PersonalFinancePage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </QueryClientProvider>
        </ThemeProvider>
    </div>

  );
};

export default App;
