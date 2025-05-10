import { Routes, Route, Navigate, Router } from "react-router-dom";
import { Header } from "./presentation/components/Header";
import { CarLibraryPage } from "./presentation/pages/CarLibraryPage";
import AddNewCar from "./presentation/pages/AddNewCar";


const Home = () => <div className="p-4">Home Page</div>;
const Services = () => <div className="p-4">Services Page</div>;
const SpecialOffers = () => <div className="p-4">Special Offers Page</div>;
const RecycleBin = () => <div className="p-4">Recycle Bin Page</div>;

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarLibraryPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/offers" element={<SpecialOffers />} />
        <Route path="/recycle-bin" element={<RecycleBin />} />
        <Route path="/add-car" element={<AddNewCar></AddNewCar>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
