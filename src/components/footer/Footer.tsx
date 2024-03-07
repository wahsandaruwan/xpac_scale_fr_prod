import "./footer.scss";
import { useTheme } from "../../contexts/ThemeContext";

const Footer = () => {
  const { themeColors } = useTheme();
  return (
    <div
      className="footer"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        color: themeColors.mainColor,
      }}
    >
      <span>XpacScale</span>
      <span>© XpacScale</span>
    </div>
  );
};

export default Footer;
