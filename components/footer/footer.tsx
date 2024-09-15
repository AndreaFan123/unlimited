import { Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 h-[100px] rounded-t-xl w-full bg-black text-white">
      <div className="flex flex-col justify-center max-w-full items-center h-full gap-5 md:flex-row md:justify-between md:max-w-[700px] mx-auto lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1400px]">
        <div className="text-center flex flex-col items-center justify-center">
          <h3 className="text-xl font-extrabold">Unlimited</h3>
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Unlimited. All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Linkedin className="w-6 h-6" color="white" />
          <Github className="w-6 h-6" color="white" />
        </div>
      </div>
    </footer>
  );
}
