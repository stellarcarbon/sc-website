export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col mt-[56px] md:mt-[80px] min-h-[calc(100vh-152px)] md:min-h-[calc(100vh-176px)] ">
      <div className="flex-1 flex flex-col justify-center items-center bg-dalle bg-no-repeat bg-fixed bg-cover">
        {children}
      </div>
    </main>
  );
}
