import React from 'react';
import {Card, CardContent, TextField, Typography, Button} from '@material-ui/core';

const Sidebar = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant='h5' component='h3' color='primary' align='center' >
            Stay in touch
          </Typography>
          <Typography variant='body1' >
            Receive E Mail notification of Latest Tutorials
          </Typography>
        </CardContent>
          
        <CardContent>
          {/* <Form className="text-center">
            <FormGroup>
              <Input type="email" name="email" placeholder="Your email address.." />
            </FormGroup>
            <button className="btn btn-outline-success text-uppercase"> Subscribe </button>
          </Form> */}
          <form action="https://kamranali.us19.list-manage.com/subscribe/post?u=81033a93b0c17d2aca19ba835&amp;id=32d4ecb6e3" 
            method="post" 
            name="mc-embedded-subscribe-form" 
            target="_blank" noValidate autoComplete="off">
            <TextField
              id="mce-EMAIL"
              label="Email"
              margin="normal"
              variant="outlined"
              type="email"
              name="EMAIL"
              fullWidth
            />
            {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
              <input type="text" name="b_835b966c8e4fb4811d20a1b0c_1ccb85525c" tabIndex="-1" defaultValue="" />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
            Subscribe
          </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Sidebar;