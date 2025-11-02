import BaseBoard from "../components/baseBoard/BaseBoard";
import BodyAdmin from "../components/box/BodyAdmin";
import Header from "../components/header/Header";

function AdminPage() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Header />
            <BodyAdmin />
            <BaseBoard/>
        </div>
    )
}    
export default AdminPage;