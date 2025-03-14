import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdInsertLink } from "react-icons/md";

const SocialLinks: React.FC<{
  links: {
    website: string;
    xPlatform: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
}> = ({ links }) => {
  return (
    <div className="text-btnColor flex flex-col gap-[0.5em] w-full">
      <div className="hover:bg-purpleHoverBtn cursor-pointer text-center py-[1em] border border-btnColor rounded-[0.2em] flex flex-row items-center justify-center gap-[0.5em]">
        <a href={links.website} className="flex gap-[0.5em]">
          <MdInsertLink size={20} />
          <b>Website</b>
        </a>
      </div>
      <div className="hover:bg-purpleHoverBtn cursor-pointer text-center py-[1em] border border-btnColor rounded-[0.2em] flex flex-row items-center justify-center gap-[0.5em]">
        <a href={links.xPlatform} className="flex gap-[0.5em]">
          <FaSquareXTwitter size={20} />
          <b>X</b>
        </a>
      </div>
      <div className="hover:bg-purpleHoverBtn cursor-pointer text-center py-[1em] border border-btnColor rounded-[0.2em] flex flex-row items-center justify-center gap-[0.5em]">
        <a href={links.facebook} className="flex gap-[0.5em]">
          <FaFacebook size={20} />
          <b>Facebook</b>
        </a>
      </div>
      <div className="hover:bg-purpleHoverBtn cursor-pointer text-center py-[1em] border border-btnColor rounded-[0.2em] flex flex-row items-center justify-center gap-[0.5em]">
        <a href={links.linkedin} className="flex gap-[0.5em]">
          <FaLinkedin size={20} />
          <b>Linkedin</b>
        </a>
      </div>
      <div className="hover:bg-purpleHoverBtn cursor-pointer text-center py-[1em] border border-btnColor rounded-[0.2em] flex flex-row items-center justify-center gap-[0.5em]">
        <a href={links.youtube} className="flex gap-[0.5em]">
          <FaYoutube size={20} />
          <b>Youtube</b>
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
