import '../../styles/SignIn.css';

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
        <div className='row social-buttons'>
          <button className='col-8'>Sign in with Google</button>
          <button className='col-2'>Facebook</button>
          <button className='col-2'>Apple ID</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

