import Header from "../components/header/Header";
import UsersView from "../components/box/UsersView";
import BaseBoard from "../components/baseBoard/BaseBoard";

function UsersControllers() {
    return <div className="flex flex-col justify-between h-screen">
        <Header />
        <UsersView />
        <BaseBoard />
    </div>;
}

export default UsersControllers;