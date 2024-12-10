import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
const DeletionModal = ({
  isOpen,
  onCancel,
  onDelete,
  isProcessing,
}: {
  isOpen: boolean;
  isProcessing?: boolean;
  onCancel: () => void;
  onDelete: () => void;
}) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onCancel}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-sm bg-white border border-dark p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-dark">
              Delete
            </DialogTitle>
            <p className="mt-2 text-sm/6 text-primary">
              Are you sure you want to delete this record?
            </p>
            <div className="mt-4 flex items-center justify-end">
              <Button
                className="mt-3 inline-flex justify-center items-center rounded-sm h-10 bg-white py-1.5 px-3 text-sm/6 font-semibold shadow-sm shadow-primary text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto mr-4"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="rounded-sm bg-danger py-2 px-3 text-sm/6 h-10 font-semibold text-white focus:outline-none shadow-sm shadow-primary data-[hover]:bg-danger/80"
                onClick={onDelete}
              >
                {isProcessing ? (
                  <div className="inline-flex justify-center items-center">
                    <svg
                      className="animate-spin mr-1 size-3 fill-white"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <circle
                          cx="7"
                          cy="7"
                          r="6"
                          stroke="#ffffff"
                          strokeOpacity=".3"
                          strokeWidth="2"
                        />
                        <path
                          fill="#ffffff"
                          fillOpacity=".1"
                          fillRule="nonzero"
                          d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z"
                        />
                      </g>
                    </svg>
                    <span className="text-sm/6 font-semibold">Deleting...</span>
                  </div>
                ) : (
                  <span>Delete</span>
                )}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeletionModal;
