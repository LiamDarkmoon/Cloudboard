import { navigate } from "astro:transitions/client";
import { actions } from "astro:actions";

export default async function LoginButton({
  isLogedIn,
}: {
  isLogedIn: boolean;
}) {
  const handleLogout = async () => {
    if (isLogedIn) {
      const result = (await actions.logout("")).data;
      if (result && result.success) {
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } else navigate("/login");
  };

  return (
    <button
      className="cta_bttn transition-all duration-300"
      type="submit"
      onClick={handleLogout}
    >
      {isLogedIn ? "Logout" : "Login"}
    </button>
  );
}
