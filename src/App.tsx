import { Routes, Route, Navigate, Router } from "react-router-dom";
import { Header } from "./presentation/components/Header";
import { CarLibraryPage } from "./presentation/pages/CarLibraryPage";
import AddNewCar from "./presentation/pages/AddNewCar";

const PageWrapper = ({ title }: { title: string }) => (
  <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md sm:max-w-lg lg:max-w-xl text-center">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        This is the <strong>{title}</strong>. You can add real content here
        later.
      </p>
    </div>
  </div>
);

const Home = () => <PageWrapper title="Home Page" />;
const Services = () => <PageWrapper title="Services Page" />;
const SpecialOffers = () => <PageWrapper title="Special Offers Page" />;
const RecycleBin = () => <PageWrapper title="Recycle Bin Page" />;

export { Home, Services, SpecialOffers, RecycleBin };

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
