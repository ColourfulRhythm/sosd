import { BgContainer } from '@/components/AdminOnboarding/styles';
import bg from '@/public/assets/onboard-bg.png';
import { MobileLogin, Overlay } from '@/components/AdminAuth/login.styles';
import Image from 'next/image';
import logo from '@/public/assets/newOnboardLogo.svg';
import Button from '@/components/AdminReusables/authBtn/index';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import SignupContext from '@/context/signupContext';
import { useWidth } from '@/hooks';
import { toast } from 'react-hot-toast';
 
const breakpoint = 767;
const Login = () => {
  const router = useRouter();
  const { responsive } = useWidth(breakpoint);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const { setIsInputWithValue } = useContext(SignupContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState()

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem('token'));
    if (userRole) {
      setUser(userRole.user);
      setUserRole(userRole.user.role);
    }

    if (userEmail !== '' || userPassword !== '') {
      setIsInputWithValue(true);
    } else {
      setIsInputWithValue(false);
    }

    const userToken = JSON.parse(localStorage.getItem('user'));

    if (userToken && userToken.success) {
      router.push('/overview');
    }
  }, [
    router,
    userEmail,
    userPassword,
    userRole,
    userEmail,
    setIsInputWithValue,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userEmail && userPassword !== '') {
      setLoading(true);
      const fetchData = async () => {
        const request = {
          email: userEmail,
          password: userPassword,
        };
        try {
          const response = await fetch(
            'https://api.ad-promoter.com/api/v1/auth/signin',
            {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(request),
            }
          );
          const json = await response.json();
          if (json.success) {
            toast.success(
              <span style={{ fontSize: '14px' }}>Login successful</span>
            );
            setLoading(false);
            localStorage.setItem('user', JSON.stringify(json));
            router.push('/overview');
          } else if (!json.success) {
            setLoading(false);
            setIsInputWithValue(true);
            toast.error(
              <span style={{ fontSize: '14px' }}>
                Invalid details, please try again
              </span>
            );
          }
        } catch (error) {
          setLoading(false);
          setError(error);
          return toast.error('Invalid details, please try again');
        }
      };

      fetchData();
    }
    setIsInputWithValue(false);
  };

  return (
    <>
      {responsive ? (
        <BgContainer image={bg}>
          <Overlay className="overlay">
            <div className="content">
              <div className="content-header">
                <Image src={logo} alt="ad-promoter logo" />
                <div className="content-header-text">
                  <h3>Log in as an admin</h3>
                </div>
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className="email">
                  <label htmlFor="email">Your Email Address</label>
                  <input
                    type="text"
                    id="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="password">
                  <div className="input-container">
                    <div className="label">
                      <label htmlFor="password">Your password</label>
                      <div
                        className="hide"
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                      >
                        {isPasswordShown ? (
                          <BsEyeSlashFill
                            style={{ color: 'rgba(102,102,102,0.8)' }}
                          />
                        ) : (
                          <BsEyeFill
                            style={{ color: 'rgba(102,102,102,0.8)' }}
                          />
                        )}
                        {isPasswordShown ? <p>Hide</p> : <p>Show</p>}
                      </div>
                    </div>
                    <input
                      id="password"
                      name="password"
                      required
                      type={isPasswordShown ? 'text' : 'password'}
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  text={isLoading ? 'Loading...' : 'Log in'}
                  onClick={handleSubmit}
                />
              </form>
            </div>
          </Overlay>
        </BgContainer>
      ) : (
        <MobileLogin>
          <div className="logo">
            <Image src={logo} alt="ad-promoter logo" />
            <div className="login">
              <h3>Log in</h3>
            </div>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="email">
              <label htmlFor="email">Your Email Adresss</label>
              <input
                type="text"
                id="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <div className="input-container">
                <div className="label">
                  <label htmlFor="password">Your password</label>
                  <div
                    className="hide"
                    onClick={() => setIsPasswordShown(!isPasswordShown)}
                  >
                    {isPasswordShown ? (
                      <BsEyeSlashFill
                        style={{ color: 'rgba(102,102,102,0.8)' }}
                      />
                    ) : (
                      <BsEyeFill style={{ color: 'rgba(102,102,102,0.8)' }} />
                    )}
                    {isPasswordShown ? <p>Hide</p> : <p>Show</p>}
                  </div>
                </div>
                <input
                  id="password"
                  name="password"
                  required
                  type={isPasswordShown ? 'text' : 'password'}
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              text={isLoading ? 'Loading...' : 'Log in'}
              onClick={handleSubmit}
            />
          </form>
        </MobileLogin>
      )}
    </>
  );
};

export default Login;
