import React from "react";
import Image from "next/image";
export default function About() {
  return (
    <div>
      <div className="relative">
        <Image
          src="/skilled-workers-background.jpg"
          className="object-cover brightness-50 w-full h-[250px]"
          width={500}
          height={200}
          quality={75}
          loading="lazy"
          alt="About Picture"
        />
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-main text-primary text-2xl font-bold capitalize">
          {" "}
          About US
        </h1>
      </div>
      <div className="lg:px-20 max-w-6xl w-full mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 grid-rows-[auto] auto-rows-fr place-items-start">
          <div className="mt-6 md:col-start-2 md:row-span-3 md:row-start-1 lg:col-span-2 lg:col-start-4">
            <Image
              src="/skilled-workers-about.jpg"
              className="object-cover border-8 w-full border-textgray"
              width={500}
              height={800}
              quality={75}
              alt="About Picture"
            />
          </div>
          <section className="lg:col-span-3">
            <h2 className="font-main text-xl font-bold">Overview</h2>
            <p className="my-2 font-MyFont">
              Welcome to the Online Skilled Worker and Employer Platform, your trusted digital hub for connecting skilled workers and employers. Our mission is to bridge the gap between talent and opportunity, making it easy for skilled workers to find jobs and employers to hire the perfect candidates.
            </p>
          </section>
          <section className="lg:col-span-3">
            <h2 className="font-main text-xl font-bold">For Skilled Workers</h2>
            <p className="my-2 font-MyFont">
              Whether you're a seasoned professional or just starting your journey, our platform offers a variety of opportunities tailored to your expertise. Skilled workers from diverse fields can showcase their talents, including:
            </p>
            <ul className="list-disc pl-5">
              <li>Agriculture: Farmer</li>
              <li>Construction: Carpenter, Mason, Welder, Foreman</li>
              <li>Fishing and Animal Care: Fisherman, Piggery Worker</li>
              <li>Personal Services: Laundryman, Hairdresser, Barber, Massage Therapist</li>
              <li>Mechanical Services: Vulcanizing</li>
              <li>Creative and Retail: Furniture Maker, Printing Services, Beauty Products Seller</li>
              <li>Small Business: Sari-Sari Store Operator, Balutan (Boiled duck eggs)</li>
            </ul>
          </section>
          <section className="lg:col-span-3">
            <h2 className="font-main text-xl font-bold">For Employers</h2>
            <p className="my-2 font-MyFont">
              Finding the perfect worker for your needs has never been easier. Browse through detailed profiles of skilled workers to discover:
            </p>
            <ul className="list-disc pl-5">
              <li>Their expertise and skill sets</li>
              <li>Years of experience in their profession</li>
              <li>Availability for your job requirements</li>
              <li>Images of their hands-on work for experience proof and fact checking</li>
            </ul>
            <p className="my-2 font-MyFont">
              Our platform allows you to evaluate potential hires based on their profiles, ensuring you connect with the right person for the job. Whether you need a carpenter for your next big project or a hairdresser for your salon, our platform is your go-to solution.
            </p>
          </section>
          <section className="lg:col-span-3">
            <h2 className="font-main text-xl font-bold">Why Choose Us?</h2>
            <ul className="list-disc pl-5">
              <li>Wide Range of Skills: From traditional crafts to modern services, we cover it all.</li>
              <li>Easy Matching: Our user-friendly interface ensures a smooth experience for both skilled workers and employers.</li>
              <li>Trust and Transparency: We are committed to creating a safe and reliable space for all users.</li>
            </ul>
            <p className="my-2 font-MyFont">
              Join us today and become part of a thriving community where talent meets opportunity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
