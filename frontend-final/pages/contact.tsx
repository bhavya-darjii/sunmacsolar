import Head from "next/head";
import Reveal from "@/components/Reveal";
import PageIntro from "@/components/site/PageIntro";
import ContactFeaturedForm from "@/components/contact/ContactFeaturedForm";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Our Engineering Team | SunMac Solar</title>
        <meta
          name="description"
          content="Request a realistic concept and quote within 48 hours for your commercial, regional, or off-grid solar installation."
        />
      </Head>
      <div data-testid="contact-page">
        <PageIntro
          overline="Contact"
          title="Talk to our engineering team."
          description="Tell us a bit about your site and what you are trying to achieve. We will come back within 48 hours with a realistic system concept and quote."
        />

        <section className="container-final pb-24">
          <Reveal>
            <ContactFeaturedForm />
          </Reveal>
        </section>
      </div>
    </>
  );
}
