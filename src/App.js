import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import NewPaletteForm from './components/NewPaletteForm';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import { useGlobalContext } from './contexts/GlobalContext';
import { generatePalette } from './helpers/colorHelpers';

function App() {
  const { palettes } = useGlobalContext();
  // console.log(palettes);

  const findPalette = (id) => {
    return palettes.find((palette) => palette.id === id);
  };

  const PaletteWrapper = () => {
    let { id } = useParams();
    const palette = generatePalette(findPalette(id));
    return <Palette palette={palette} />;
  };

  const SinglePaletteWrapper = () => {
    let { paletteId, colorId } = useParams();
    const palette = generatePalette(findPalette(paletteId));
    return <SingleColorPalette palette={palette} colorId={colorId} />;
  };

  // const savePalette = (newPalette) => {
  //   console.log(newPalette);
  // };

  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={palettes} />} />
      <Route path="/palette/:id" element={<PaletteWrapper />} />
      <Route
        path="/palette/:paletteId/:colorId"
        element={<SinglePaletteWrapper />}
      />
      <Route path="/palette/new" element={<NewPaletteForm />} />
    </Routes>
  );
}

export default App;
