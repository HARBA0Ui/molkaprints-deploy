import { CgInstagram, CgPhone } from "react-icons/cg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full flex bg-pinky">
      <div className="w-[90vw] md:w-[75vw] m-auto text-white py-3  flex justify-between items-center">
        <Link
          to="/"
          reloadDocument={true}
          href=""
          className="group flex gap-2 items-center"
        >
          <img
            src="/logo.jpg"
            className="w-12 md:w-16 h-12 md:h-16 rounded-full drop-shadow-md group-hover:scale-110 transition-all"
          />
          <span className="text-base md:text-xl">Molka Prints</span>
        </Link>
        <div>
          <h2 className="text-base md:text-2xl uppercase w-fit mb-1">Contact</h2>
          <a
            href="https://www.instagram.com/molka_prints?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="flex items-center justify-start gap-3 mb-1"
            target="_blank"
          >
            <CgInstagram /> @molka_prints
          </a>
          <a className="flex items-center justify-start gap-3">
            <CgPhone /> +216 54 243 724
          </a>
        </div>
        <div className="text-xl uppercase hidden lg:block">
          Start Each Day With A Plan
        </div>
      </div>
    </footer>
  );
}

export default Footer;
