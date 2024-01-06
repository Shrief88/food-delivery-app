import MaxWidthWrapper from "./MaxWidthWrapper";
import logo from "../../assets/images/res-logo.png";
import { Facebook, Linkedin, Github } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-accent mt-14">
      <MaxWidthWrapper className="px-5">
        <div className="flex flex-col gap-10 pb-4 pt-12">
          <div className=" grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            <div className="flex flex-col">
              <img src={logo} className="h-16 w-16 mb-2" />
              <p>Tasty Treat</p>
              <p className="text-muted-foreground text-sm pt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt pariatur accusamus
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-lg">Delivery Time</p>
              <div className="text-muted-foreground text-sm">
                <p>Sunday - Thursday</p>
                <p>10:00am - 11:00pm</p>
              </div>
              <div className="text-muted-foreground text-sm">
                <p>Friday - Saturday</p>
                <p>Off day</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-lg">Contact</p>
              <div className="flex flex-col text-muted-foreground text-sm gap-1">
                <p>Location: Cairo, Egypt</p>
                <p>Phone: +20123456789</p>
                <p>Email: shriefessam1999@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 items-center text-sm">
            <p className=" text-primary order-2">
              Copyright - 2024, website made by Shrief Essam. All Rights
              Reserved.
            </p>
            <div className="flex items-center md:justify-center order-1 md:order-2">
              <p>Follow: </p>
              <div className="pl-2 sm:pl-4 md:flex-shrink-0 flex justify-center">
                <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center">
                  <a href="https://www.facebook.com/shrief.essam.148/">
                    <Facebook className="text-white size-4" />
                  </a>
                </div>
              </div>
              <div className="pl-2 sm:pl-4 md:flex-shrink-0 flex justify-center">
                <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center">
                  <a href="https://www.linkedin.com/in/shrief-essam-4486a31a1/">
                    <Linkedin className="text-white size-4" />
                  </a>
                </div>
              </div>
              <div className="pl-2 sm:pl-4 md:flex-shrink-0 flex justify-center">
                <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center">
                  <a href="https://github.com/Shrief88">
                    <Github className="text-white size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Contact;
