import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageCanvasProps = {
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
};

/** Ambient background + stacking context for inner pages (header/footer stay outside). */
export default function PageCanvas({ children, className, "data-testid": testId }: PageCanvasProps) {
  return (
    <div className={cn("inner-page", className)} data-testid={testId}>
      <div className="inner-page__ambient" aria-hidden />
      <div className="inner-page__body">{children}</div>
    </div>
  );
}
