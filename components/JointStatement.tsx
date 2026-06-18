import { Reveal } from "@/components/Reveal";

/** Velké prohlášení mezi herem a sekcí About — „Joint us." s růžovým „us.". */
export function JointStatement() {
  return (
    <Reveal as="div" className="joint-statement">
      <div className="joint-inner">
        <span className="joint-text">Joint</span>
        <span className="joint-text joint-us">us.</span>
      </div>
    </Reveal>
  );
}
