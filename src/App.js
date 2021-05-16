import './App.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';


function App() {
  return (
    <Container >
       <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Typography variant="h3" noWrap>
              MySocial-React
            </Typography>
          </AppBar>
        </Grid>
        <Grid item xs={16} sm={8}>
          <Paper >xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={8} sm={4}>
          <Paper >xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
