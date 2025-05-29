import './css/app.css'
import './css/reset.css'
import ListComponent from './components/ListComponent.tsx'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
    return (
        <>
            <Header/>
            <ListComponent/>
            <Footer/>
        </>
    )
}
