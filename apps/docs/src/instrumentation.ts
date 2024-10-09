export async function register() {
  return new Promise((r) => {
    console.log(
      `Hello from register! Hogging 10 seconds.`,
      process.env.NEXT_RUNTIME
    );
    setTimeout(() => {
      r(1);
    }, 10000);
  });
}
