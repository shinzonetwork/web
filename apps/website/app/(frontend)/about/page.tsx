import BlockHero from "@/components/block-hero";

export default function Home() {
  return (<>
    <BlockHero
      eyebrow="About Shinzō"
      title={<h1>Where Truth Becomes Infrastructure<span className="highlight">/</span></h1 >}
    />
  </>
  );
};