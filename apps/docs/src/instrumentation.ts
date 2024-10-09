
export async function register() {
  await demo_MultiUIRegister();
}

async function demo_MultiUIRegister() {
  console.log(`Initiating MultiUI register...`);
  if(process.env.NEXT_RUNTIME === "nodejs") {
    const fs = await import('fs');
    // fs.wri
  }
}
