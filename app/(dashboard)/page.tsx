import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <div>
      <h1>This is authenticated Page</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HomePage;
