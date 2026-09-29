import { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type PageIntroProps = {
  overline: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

export default function PageIntro({ overline, title, description, children }: PageIntroProps) {
  return (
    <section className="container-final page-intro-pad">
      <Reveal>
        <p className="overline">{overline}</p>
        <h1 className="display-lead mt-4 max-w-4xl">
          <span className="font-semibold">{title}</span>
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#57534e]">{description}</p>
        )}
        {children}
      </Reveal>
    </section>
  );
}
