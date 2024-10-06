import { Theme } from "@multinite_official/multiui";

async function Page() {
  const res = await fetch("http://localhost:3000/api/test");
  const data = await res.json();
  return (
    <Theme
      theme={data}
      className="w-screen h-screen bg-background text-foreground themed:bg-green-500"
    >
      <div className="flex items-center justify-center w-32 h-32 text-sm text-center border-2 border-red-500 bg-primary">
        Am I themed?
      </div>
      <div className="w-32 h-32 m-5 bg-blue-500" data-theme></div>
    </Theme>
  );
}

export default Page;
