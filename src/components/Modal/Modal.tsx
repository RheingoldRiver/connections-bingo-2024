import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export const Modal = ({
  children,
  trigger,
  onOpenAutoFocus,
  open,
  onOpenChange,
}: {
  children: ReactNode;
  trigger?: ReactNode;
  onOpenAutoFocus?: () => void;
  open?: boolean | undefined;
  onOpenChange?: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <Dialog.Trigger asChild>
          <button>{trigger}</button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className={clsx("bg-gray-900 opacity-40 dark:opacity-80 fixed inset-0")} />
        <Dialog.Content
          onOpenAutoFocus={onOpenAutoFocus}
          className={clsx(
            "bg-gray-200 dark:bg-gray-800 dark:text-gray-50",
            "rounded-lg pt-8 pb-0 shadow-md shadow-gray-500 dark:shadow-none",
            "fixed top-[5vw] left-[5vw] sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%]",
            "p-4 pb-6",
            "max-h-[90vh] overflow-y-auto w-[min(90vw,_40rem)]",
            "z-[1000]"
          )}
        >
          {children}
          <Dialog.Close asChild>
            <button className="absolute cursor-pointer top-3 right-3 " aria-label="Close">
              <XMarkIcon className="text-black dark:text-gray-50 hover:text-red-400 dark:hover:text-red-600 h-6 w-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
