"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../animate-ui/components/radix/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

interface ModalProps {
  modalId: string;
  openId: string;
  title: string;
}

export default function Modal({
  openId,
  modalId,
  title,
  children,
}: PropsWithChildren<ModalProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get(modalId);
  const isMobile = useIsMobile();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Reset form or perform any other action on close
      // if (modal) router.back();

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: modalId,
        value: modal,
      });

      // replace URL without scrolling
      router.replace(newUrl || "/", { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [modalId],
      });

      // replace URL without scrolling
      router.replace(newUrl || "/", { scroll: false });
    }
  };

  if (isMobile) {
    return (
      <Drawer open={modal === openId} onOpenChange={handleOpenChange}>
        <DrawerContent className="h-[130vh] bg-white px-4">
          <DrawerHeader>
            <DrawerTitle className="cursor-pointer text-center text-xl font-bold">
              {title}
            </DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[66vh]">{children}</ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={modal === openId} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="cursor-pointer text-center text-xl font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function useModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const close = (modalId: string) => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: [modalId],
    });

    // replace URL without scrolling
    router.replace(newUrl || "/", { scroll: false });
  };

  return { close };
}
