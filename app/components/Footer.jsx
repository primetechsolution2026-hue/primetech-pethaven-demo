import { FOOTER_LINKS } from "./Data";
import { MapPinIcon, PhoneIcon, MailIcon, FacebookIcon, InstagramIcon, TwitterIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">

        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              P
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">PetHaven</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Your friendly neighbourhood destination for healthy pets, trusted care, and
            everything they need to feel at home.
          </p>

          {/* Social icons */}
          <div className="flex gap-3">
            {[<FacebookIcon />, <InstagramIcon />, <TwitterIcon />].map((icon, i) => (
              <button
                key={i}
                className="w-9 h-9 bg-slate-100 hover:bg-blue-100 hover:text-blue-600 rounded-full flex items-center justify-center text-slate-500 transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="font-bold text-slate-800 text-sm mb-4">{heading}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-400 text-sm hover:text-blue-600 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact column */}
        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-4">Contact</h4>
          <ul className="space-y-3">
            {[
              [<MapPinIcon />, "123 Pet Street, Animal City, PA 2345"],
              [<PhoneIcon />, "+1 (555) 123-4567"],
              [<MailIcon />, "hello@pethaven.com"],
            ].map(([icon, text], i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="mt-0.5 text-slate-400 shrink-0">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-400">
        <span>© 2025 PetHaven. All rights reserved.</span>
        <span>Made with care for animals and their humans. 🐾</span>
      </div>
    </footer>
  );
}