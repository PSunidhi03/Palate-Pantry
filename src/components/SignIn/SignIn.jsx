import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card login-card">
        <div className="row no-gutters">
          <div className="col-md-6 bg-orange">
            <div className="p-4 text-center">
              <img src="/path/to/logo.png" alt="logo" className="logo mb-4" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h3 className="card-title text-center">Welcome to <span className="text-orange">Palate-pantry</span></h3>
              <p className="text-right">No Account? <a href="#" className="text-orange">Sign up</a></p>
              <form>
                <div className="form-group">
                  <label>Enter your username or email address</label>
                  <input type="text" className="form-control" placeholder="Username or email address" />
                </div>
                <div className="form-group">
                  <label>Enter your Password</label>
                  <div className="input-group">
                    <input type="password" className="form-control" placeholder="Password" />
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fa fa-eye"></i></span>
                    </div>
                  </div>
                  <p className="text-right"><a href="#" className="text-orange">Forgot Password</a></p>
                </div>
                <button type="submit" className="btn btn-orange btn-block">Sign in</button>
                <p className="text-center my-3">OR</p>
                <div className="d-flex justify-content-around">
                  <button className="btn btn-light"><i className="fa fa-google"></i> Sign in with Google</button>
                  <button className="btn btn-light"><i className="fa fa-facebook"></i></button>
                  <button className="btn btn-light"><i className="fa fa-apple"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
