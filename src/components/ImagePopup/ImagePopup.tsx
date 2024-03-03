import "./imagePopup.scss"; // Import the SCSS file

interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  isOpen,
  onClose,
  imageSrc,
}) => {
  return (
    <div className={`popup-container ${isOpen ? "open" : "closed"}`}>
      <div className="popup-content">
        <img src={imageSrc} alt="" />
        <button type="button" onClick={onClose} className="form-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;
