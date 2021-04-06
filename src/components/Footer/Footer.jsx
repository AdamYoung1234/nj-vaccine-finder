import { Container, Segment } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Container fluid>
      <div className="footer__container">
        <Segment className="footer__segment" basic inverted padded>
          <div className="footer__content">&#169; Chen Yang. Powered by React & Semantic UI.</div>
        </Segment>
      </div>
    </Container>
  );
};

export default Footer;
