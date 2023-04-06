import "./App.css";
import { NavbarLogin, NavbarUser } from "./pages/Navbar";


function App() {
  return (
    <div className="App bg-black h-screen">
      <br />
      <br />
      <br />
      <center>
        <h1 className="text-3xl text-red font-sans">Hello world! ล้างแอร์</h1>
        <br />
        <br />
        <button className="btn-primary">Button Primary</button>
        <button className="btn-primary-large">Button Primary</button>
        <br />
        <br />
        <button className="btn-secondary">Button Secondary</button>
        <button className="btn-secondary-large">Button Secondary</button>
        <br />
        <br />
        <button className="btn-ghost">Button Ghost</button>
      </center>
      <NavbarLogin />
      <br />
      <NavbarUser />
      <br />
      
    </div>
  );
}

export default App;
