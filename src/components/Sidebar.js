import React from 'react';
import {CardHeader, Card, CardContent, TextField} from '@material-ui/core';

const Sidebar = () => {
  return (
    <div>
      <Card>
        <CardHeader
          title="Subscribe"
          />
          
        <CardContent>
          {/* <Form className="text-center">
            <FormGroup>
              <Input type="email" name="email" placeholder="Your email address.." />
            </FormGroup>
            <button className="btn btn-outline-success text-uppercase"> Subscribe </button>
          </Form> */}
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Email"
              margin="normal"
              variant="outlined"
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Sidebar;