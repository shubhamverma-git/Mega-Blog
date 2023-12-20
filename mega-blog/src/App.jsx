import "./App.css";

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL); // method to take access of env file
  return (
    <>
      <h1>Mega Blog App with Appwrite</h1>
    </>
  );
}

export default App;
