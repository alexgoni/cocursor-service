import CoCursorProvider from "./components/CoCursorProvider";

export default function App() {
  return (
    <>
      <CoCursorProvider channel="chat">
        <h1>hello</h1>
      </CoCursorProvider>
    </>
  );
}
