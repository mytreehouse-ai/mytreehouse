const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const page = async () => {
  await wait(5000);

  return <>ContactUs</>;
};

export default page;
