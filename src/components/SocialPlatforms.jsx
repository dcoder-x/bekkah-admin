import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import twitterIcon from "@iconify-icons/mdi/twitter";
import facebookIcon from "@iconify-icons/mdi/facebook";
import instagramIcon from "@iconify-icons/mdi/instagram";
import youtubeIcon from "@iconify-icons/mdi/youtube";
import { SellerContext } from "../App";
import axios from "axios";
import { toast } from "react-hot-toast";

function Socialname() {
  const { seller, getSeller } = useContext(SellerContext);
  console.log(seller);
  const [socialLinks, setSocialLinks] = useState([]);
  const [processing, setProcessing] = useState(false);

  const socialIcon = {
    instagram: instagramIcon,
    facebook: facebookIcon,
    youtube: youtubeIcon,
    twitter: twitterIcon,
  };

  const [newSocialLink, setNewSocialLink] = useState({
    name: "",
    link: "",
  });

  const handleSocialLinkChange = (event) => {
    const { name, value } = event.target;
    setNewSocialLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSocialLink = async (event) => {
    setSocialLinks((prev) => [...prev, newSocialLink]);
    event.preventDefault();
    try {
      setProcessing(true);
      const response = await axios.post(
        "https://mazamaza.onrender.com/api/seller/shop/social",
        newSocialLink,
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );

      if (response) {
        setProcessing(false);
        console.log(response.data.shop);
        toast(response.data.message || "Social profile updated");
        setNewSocialLink({ name: "", link: "" });

        getSeller();
      }
    } catch (error) {
      console.log(error);
      setProcessing(false);
      toast(error.response.data.message || "error: Social profile not updated");
    }
  };

  const handleDeletePlatform = async (name) => {
    try {
      const response = await axios.delete(
        `https://mazamaza.onrender.com/api/seller/shop/social/${name}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );

      if (response) {
        toast(response.data.message || "Social profile updated");

        getSeller();
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message || "error: Social profile not updated");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Social Links</h1>
      <form onSubmit={handleAddSocialLink} className="mb-8">
        <div className="flex mb-4">
          <select
            name="name"
            placeholder="name"
            value={newSocialLink.name}
            onChange={handleSocialLinkChange}
            className="border border-gray-400 rounded-l py-2 px-4 w-1/2"
            required
          >
            <optgroup>
              <option value="">Select Social platform</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="Linked">Linked</option>
            </optgroup>
          </select>
          <input
            type="link"
            name="link"
            placeholder="link"
            value={newSocialLink.link}
            onChange={handleSocialLinkChange}
            className="border border-gray-400 rounded-r py-2 px-4 w-1/2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            {processing ? "Processing" : "Add"}
          </button>
        </div>
      </form>
      <ul className="grid grid-cols-2 gap-4">
        {seller?.shop?.socialPlatforms?.length > 0 ? (
          seller?.shop?.socialPlatforms?.map(({ name, link }, index) => {
            console.log(name, link);
            let icon = null;

            switch (name) {
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
              name && (
                <li
                  key={index}
                  className="flex items-center bg-gray-100 rounded-lg px-4 py-2 justify-between"
                >
                  <Icon icon={icon} className="text-gray-400 w-6 h-6 mr-2" />
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 font-medium hover:underline"
                  >
                    {name}
                  </a>

                  <p
                    className=" hover:cursor-pointer hover:text-blue-600 text-black mx-2 text-2xl hover:text-3xl transition-all font-medium"
                    onClick={(e) => {
                      handleDeletePlatform(name);
                    }}
                  >
                    &times;
                  </p>
                </li>
              )
            );
          })
        ) : (
          <p>You have not linked any accounts yet</p>
        )}
      </ul>
    </div>
  );
}

export default Socialname;
