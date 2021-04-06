import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

const NoAvailableAppointment = () => {
  return (
    <React.Fragment>
      <Container fluid textAlign="center" className="no-appointment-container">
        <Header as="h2" icon size="huge">
          <Icon name="calendar times outline" />
          No Available Appointment
          <Header.Subheader>
            There is no available appointment in your county right now.
          </Header.Subheader>
        </Header>
      </Container>
    </React.Fragment>
  );
};

export default NoAvailableAppointment;
