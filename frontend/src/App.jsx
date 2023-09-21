import './App.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/SideBar';
import {Row,Col} from 'react-bootstrap'
import { useSelector } from 'react-redux';

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
     <div style={{ paddingTop: "56px" }}>
        <Row style={{ marginRight: "0", marginLeft: "0" }}>
          {userInfo && (
            <Col md={2} style={{ position: "fixed", height: "calc(100vh - 56px)", overflow: "auto", marginTop: "56px" }}>
              <Sidebar />
            </Col>
          )}
          <Col md={userInfo ? 10 : 12} style={{ marginLeft: userInfo ? "16.666667%" : "0", overflow: "auto", marginTop: "56px" }}>
            <main>
              <Container>
                <Outlet />
              </Container>
            </main>
          </Col>
        </Row>
        
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App


