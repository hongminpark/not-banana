import { useRef, useState } from "react";
import Modal from "react-modal";
import { detectBanana } from "../utils/detect";

Modal.setAppElement("#__next"); // replace with your app element id

const BananaUploader: React.FC = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = URL.createObjectURL(file);
        imageRef.current!.src = url;
        setImage(url);
        setSelectedImage(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="imageUpload"
      />
      <button
        onClick={() => document.getElementById("imageUpload")?.click()}
        className="border-2 border-black bg-white px-4 py-2 font-medium tracking-tighter text-black hover:bg-black hover:text-white"
      >
        Drop banana
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="mx-auto w-1/4 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center"
      />
      <img
        ref={imageRef}
        src="#"
        alt="Selected"
        style={{ display: selectedImage ? "block" : "none" }}
        className="max-w-full h-auto"
        onLoad={() => {
          if (imageRef.current) {
            detectBanana(imageRef.current!,);
          }
        }}
      />
      {image && (
          <button
            onClick={() => {
              imageRef.current!.src = "#";
              URL.revokeObjectURL(image);
              setSelectedImage(null);
              setImage(null);
            }}
          >
            Close image
          </button>
        )}
    </div>
  );
};

export default BananaUploader;
