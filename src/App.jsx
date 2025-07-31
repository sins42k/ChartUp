import { FileUpload } from './components/FileUpload';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">ChartUp</h1>
        <p className="text-lg text-gray-600">파일을 업로드하여 손쉽게 차트를 만들어보세요.</p>
      </header>
      <main>
        <FileUpload />
      </main>
    </div>
  );
}

export default App;
