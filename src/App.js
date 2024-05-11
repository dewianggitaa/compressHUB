import Home from "./Home/Home";
import ConvertImage from "./ConvertImage/ConvertImage";
import ConvertAudio from "./ConvertAudio/ConvertAudio";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/image" element={<ConvertImage/>}/>
          <Route path="/audio" element={<ConvertAudio/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
