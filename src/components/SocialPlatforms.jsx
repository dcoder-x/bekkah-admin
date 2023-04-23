import { useState } from "react";
import { Icon } from "@iconify/react";
import twitterIcon from "@iconify-icons/mdi/twitter";
import facebookIcon from "@iconify-icons/mdi/facebook";
import instagramIcon from "@iconify-icons/mdi/instagram";
import youtubeIcon from "@iconify-icons/mdi/youtube";

function SocialPlatform() {
  const [socialLinks, setSocialLinks] = useState([
    { platform: "Twitter", url: "https://twitter.com" },
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "YouTube", url: "https://youtube.com" },
  ]);

  const [newSocialLink, setNewSocialLink] = useState({
    platform: "",
    url: "",
  });

  const handleSocialLinkChange = (event) => {
    const { name, value } = event.target;
    setNewSocialLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSocialLink = (event) => {
    event.preventDefault();
    setSocialLinks((prev) => [...prev, newSocialLink]);
    setNewSocialLink({ platform: "", url: "" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Social Links</h1>
      <form onSubmit={handleAddSocialLink} className="mb-8">
        <div className="flex mb-4">
          <select
            name="platform"
            placeholder="Platform"
            // value={newSocialLink.platform}
            onChange={handleSocialLinkChange}
            className="border border-gray-400 rounded-l py-2 px-4 w-1/2"
            required
          >
            <optgroup>
              <option value="Facebook">
                Facebook
              </option>
              <option value="Facebook">
                Instagram
              </option>
              <option value="Facebook">
                Twitter
              </option>
            </optgroup>
          </select>
          <input
            type="url"
            name="url"
            placeholder="URL"
            value={newSocialLink.url}
            onChange={handleSocialLinkChange}
            className="border border-gray-400 rounded-r py-2 px-4 w-1/2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="grid grid-cols-2 gap-4">
        {socialLinks.map(({ platform, url }, index) => {
          let icon = null;

          switch (platform) {
            case "Twitter":
              icon = twitterIcon;
              break;
            case "Facebook":
              icon = facebookIcon;
              break;
            case "Instagram":
              icon = instagramIcon;
              break;
            case "YouTube":
              icon = youtubeIcon;
              break;
            default:
              break;
          }

          return (
            <li
              key={index}
              className="flex items-center bg-gray-100 rounded-lg px-4 py-2"
            >
              <Icon icon={icon} className="text-gray-400 w-6 h-6 mr-2" />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 font-medium hover:underline"
              >
                {platform}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SocialPlatform;
