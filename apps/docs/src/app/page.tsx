export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center gap-5 text-primary flex-col">
      <span className="text-lg">Hello and welcome to the MultiUI docs!</span>
      <span className="text-lg text-secondary">
        Hello and welcome to the MultiUI docs!
      </span>
      <button className="focus:outline-focus">Hello, World!</button>
      <button className="">Hello, World!</button>
      <button className="focus:ring-focus focus:ring-offset-2 focus:ring focus:outline-none">Hello, World!</button>
    </div>
  );
}
