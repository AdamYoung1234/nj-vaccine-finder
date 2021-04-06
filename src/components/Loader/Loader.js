import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

const Loader = () => (
  <Dimmer active inverted>
    <SemanticLoader size="huge">Finding Available Appointments</SemanticLoader>
  </Dimmer>
);

export default Loader;
