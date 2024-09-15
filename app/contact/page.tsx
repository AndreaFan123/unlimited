import ContactForm from "@/components/form/contact-form";

export default function Contact() {
  return (
    <div className=" max-w-full items-center h-full gap-5 md:flex-row md:justify-between md:max-w-[500px] mx-auto lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px]">
      <div className="flex flex-col justify-start px-4">
        <h1 className="text-3xl inline-block font-extrabold my-10 lg:my-14 xl:my-20 lg:text-5xl xl:text-6xl">
          Contact
        </h1>

        <div className="border-b-[1px] border-gray-300 w-full mb-10"></div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ContactForm />
      </div>
    </div>
  );
}
