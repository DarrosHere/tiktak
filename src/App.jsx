import './App.css';
import VideoList from './components/video-list';
import './index.css';
import LeftBlock from './components/left-block';

function App() {
  return (
    <div className="App min-h-screen flex flex-row bg-black">
      <div className="left-block w-[350px] h-full bg-black/80 text-white flex flex-col justify-between py-8 px-6 fixed top-0 left-0 z-10">
        <LeftBlock />
      </div>
      <div className="flex-1 flex items-center justify-center ml-[350px]">
        <VideoList />
      </div>
    </div>
  );
}

export default App;