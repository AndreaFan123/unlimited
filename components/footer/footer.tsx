export default function Footer() {
  return (
    <footer className="w-full md:max-w-[800px] mx-auto py-4 border-t-[1px] border-gray-400 border-dashed bottom-0 ">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-extrabold">Unlimited</h3>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Unlimited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
