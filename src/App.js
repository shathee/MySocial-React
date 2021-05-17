import './App.css';
import Container from '@material-ui/core/Container';
import Home from './pages/home'
import { UserContextProvider } from './contexts/user';


function App() {
  return (
    <UserContextProvider>
      <Container >
        <Home />
      </Container>
    </UserContextProvider>
  );
}

export default App;
