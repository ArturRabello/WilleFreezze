import Header from '../components/header/Header.tsx';
import LoginBox from '../components/box/LoginBox.tsx';
import Footer from '../components/baseBoard/BaseBoard.tsx';
function Login() {
    return (
        <div className={`flex flex-col justify-between h-screen`}>
            <Header  />
            <LoginBox />
            <Footer  />
        </div>
    )
}

export default Login