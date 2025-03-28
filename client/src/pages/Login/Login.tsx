import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import LoginForm from './LoginForm/LoginForm';
import OtherLoginOptions from './OtherLoginOptions/OtherLoginOptions';
import WebsiteLoginOptions from './OtherLoginOptions/WebsiteLoginOptions/WebsiteLoginOptions';
import GoogleBtn from './OtherLoginOptions/GoogleBtn/GoogleBtn';
import LoginImg from './LoginImg/LoginImg';

const Login = () => {
  const [isDifferentAccount, setDifferentAccount] = useState(false);
  const cookie = useSelector((state: RootState) => state?.user?.cookie);
  const prevWGoogle = useSelector((state: RootState) => state?.user?.isLoggedPreviouslyWithGoogle);

  return (
    <div className="h-screen bg-cover bg-center">
      <div className="flex w-full flex-1 items-center justify-center">
        <LoginImg />
        <div className="h-svh w-full max-w-[29rem] rounded-lg bg-white p-6">
          <h2 className="mb-10 mt-20 text-center font-sans text-3xl font-extrabold text-gray-800">
            Log in to continue your learning journey
          </h2>
          {!prevWGoogle && (
            <div>
              <LoginForm />
              <OtherLoginOptions />
            </div>
          )}
          {isDifferentAccount && (
            <div>
              <LoginForm />
              <OtherLoginOptions />
            </div>
          )}
          {prevWGoogle && !isDifferentAccount && (
            <div>
              <GoogleBtn />
            </div>
          )}
          <div className="items-center justify-center text-center">
            {prevWGoogle && (
              <div
                onClick={() => setDifferentAccount(true)}
                className={`${isDifferentAccount ? 'hidden' : 'block'}`}
              >
                <WebsiteLoginOptions
                  text={`Log in to a different account`}
                  to={`/login`}
                  extraCSS={`text-base font-extrabold`}
                />
              </div>
            )}
            <WebsiteLoginOptions
              text={`Don't have an account ?`}
              to={'/login'}
              extraCSS={`text-center w-full text-base no-underline text-gray-950 font-normal`}
              textAfterSpace={` Sign up`}
              textAfterSpaceCSS={`underline text-purple-600 font-extrabold`}
            />
            <hr className="w-full" />
            <WebsiteLoginOptions
              text={`Log in with your organization`}
              to={`/organization/global-login/email`}
              extraCSS={`font-extrabold text-sm`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
