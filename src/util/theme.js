import { createMuiTheme } from '@material-ui/core/styles';
import {deepPurple, red, indigo, yellow, cyan, lightGreen} from '@material-ui/core/colors/';


const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: red
  },
  typography: {
    fontSize: 16,
    h1 : {
      fontSize: "3rem",
      fontWeight: 500,
      color: deepPurple[700]
    }
  },
  button: {
    color: "primary",
    variant: "contained"
  },
  linkTransition: {
    fade: "true",
    duration: .5
  },
  postGridItemPadding: '16px',
  headingColor: indigo,
  highlightOne: yellow,
  highlightTwo: cyan,
  highlightThree: lightGreen
});

export default theme