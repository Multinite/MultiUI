import { Theme } from "@multinite_official/multiui";

async function Page() {
  const res = await fetch("http://localhost:3000/api/test");
  const data = await res.json();
  return (
    <Theme theme={data}>
      <div className="flex items-center justify-center w-32 h-32 text-sm text-center border-2 border-red-500 bg-primary">
        Am I themed?
      </div>
    </Theme>
  );
}

export default Page;
