import { content } from "@/consts/content";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

export default function TermsConditionPage() {
  const sanitizedHtml = DOMPurify.sanitize(content.condition);
  const reactElements = parse(sanitizedHtml);

  return (
    <section>
      <div className="bg-[url('/images/bg-image1.png')] bg-cover bg-center py-[3.7rem]">
        <h2 className="text-center text-3xl font-semibold text-white">
          Terms & Conditions
        </h2>
      </div>

      <div className="section-container my-10">
        <div>{reactElements}</div>
      </div>
    </section>
  );
}
