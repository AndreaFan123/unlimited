import * as runtime from "react/jsx-runtime";
import Image from "next/image";

function useMdxComponent(code: string) {
  const fn = new Function(code);
  return fn({
    ...runtime,
  }).default;
}

const components = {
  Image,
};

type MdxProps = {
  code: string;
};

export default function MdxContent({ code }: MdxProps) {
  const Component = useMdxComponent(code);
  return <Component components={components} />;
}
