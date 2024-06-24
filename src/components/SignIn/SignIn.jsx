import '../../styles/SignIn.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
const SignIn = () => {
  return (
    <div className='sign-in-page container-fluid p-0'>
      <div className='left-banner'>
        <div className='logo'>
          <img src="/src/assets/logo.png" alt="" className="logo-img" />
        </div>
      </div>
      <div className='signin-form'>
        <div className='row'>
          <div className='col-6'>
            <p>Welcome to</p>
            <p>Palate-pantry</p>
          </div>
          <div className='col-6 text-right'>
            <p>No Account?</p>
            <a href='#'><p>Sign up</p></a>
          </div>
        </div>
        <div>
          <label htmlFor="username">Enter your username or email address</label><br />
          <input name='username' type="text" placeholder='Username or email address' /><br />
        </div>
        <div>
          <label htmlFor="password">Enter your password</label><br />
          <input name='password' type="password" placeholder='Password' />
          <a href="#">Forgot Password?</a>
        </div>
        <div><button className='signin-button'>Sign in</button></div>
        <div className="text-center mt-3">Or</div>
        <Container className="sign-in-buttons">
      <Row>
        <Col className="text-center">
          <Button variant="light" className="sign-in-button">
            <img src="/src/assets/google.png" alt="Google" className="button-icon" />
            Sign in with Google
          </Button>
        </Col>
      </Row>
    </Container>
      </div>
    </div>
  );
};

export default SignIn;

