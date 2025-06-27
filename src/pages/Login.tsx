import Header from '../components/Header.tsx';
import LoginBox from '../components/LoginBox.tsx';
import Footer from '../components/BaseBoard.tsx';
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