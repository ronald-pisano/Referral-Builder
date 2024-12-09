import { Dialog, DialogPanel, Field, Label, Button } from "@headlessui/react";
import { RefObject, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "./canvasUtils";

const ImageCropper = ({
  isOpen,
  image,
  setImage,
  setIsOpen,
  onClose,
  setCroppedImage,
  fileInputRef,
}: {
  isOpen: boolean;
  image: string | undefined;
  croppedImage: string | undefined;
  setImage: (image: string | undefined) => void;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  setCroppedImage: (croppedImage: string | undefined) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  //   const [isOpen, setIsOpen] = useState(false);
  //   const fileInputRef = useRef<HTMLInputElement>(null);
  //   const [image, setImage] = useState<string>();
  //   const [croppedImage, setCroppedImage] = useState<string>();

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: any = await readFile(file);
      setIsOpen(true);
      setImage(imageDataUrl);
    }
  };

  const closeCropper = () => {
    onClose && onClose();
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setIsOpen(false);
    setImage(undefined);
    setCroppedImage(undefined);
  };

  const readFile = (file: any): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const updateCroppedImage = async () => {
    try {
      const croppedImage: string | null = await getCroppedImg(
        image!,
        croppedAreaPixels!,
        rotation
      );

      setIsOpen(false);
      croppedImage && setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple={false}
        accept="image/*"
        onChange={onFileChange}
      />
      <Dialog open={isOpen} onClose={closeCropper} className="relative z-50">
        <div className="fixed inset-0 flex h-full items-center justify-center p-4 bg-dark/80">
          <DialogPanel
            className="w-full h-full max-h-[calc(80%)] p-12 flex-col"
            onAbort={closeCropper}
          >
            <div className="w-full h-full relative">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1 / 1}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                // style={{ containerStyle: { height: "90%" } }}
              />
            </div>
            <div className="controls py-4 absolute left-0 bottom-0 w-full px-16 bg-dark/80">
              <div className="flex-col">
                <div className="flex space-x-8">
                  <Field className="flex-col w-full place-items-center">
                    <Label className="block font-bold text-inverse mb-2">
                      Zoom
                    </Label>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      defaultValue={1}
                      value={zoom}
                      className="w-full h-2 block bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setZoom(Number(e.target.value))}
                    />
                  </Field>
                  <Field className="flex-col w-full place-items-center">
                    <Label className="block font-bold text-inverse mb-2">
                      Rotation
                    </Label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      defaultValue={0}
                      value={rotation}
                      className="w-full h-2 block bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
                      onChange={(e) => setRotation(Number(e.target.value))}
                    />
                  </Field>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    className="text-sm w-20 mx-8 text-primary font-bold p-2 rounded-sm bg-white hover:bg-white/80 shadow-md shadow-dark/20"
                    onClick={closeCropper}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={updateCroppedImage}
                    className="text-sm w-20 mx-8 text-white font-bold p-2 rounded-sm bg-accent hover:bg-accent/80 shadow-md shadow-dark/20"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ImageCropper;
