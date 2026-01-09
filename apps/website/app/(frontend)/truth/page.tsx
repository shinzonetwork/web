import BlockManifesto from "@/components/block-manifesto";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shinzō | The Read Layer of Truth",
  description: "",
};

export default function Page() {
  return (<>
    <BlockManifesto />
  </>
  );
};

