"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@shinzo/ui/cn";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 flex w-full flex-col overflow-clip bg-white/95",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay>
        <div className="relative flex h-full w-full justify-center overflow-y-auto overflow-x-hidden">
          <div className="relative my-auto border-x border-szo-black/30">
            <div className="absolute top-0 left-1/2 z-[51] h-px w-screen -translate-x-1/2 bg-szo-black/30" />
            <div className="absolute bottom-0 left-1/2 z-[51] h-px w-screen -translate-x-1/2 bg-szo-black/30" />
            <div className="absolute bottom-0 left-1/2 z-[51] h-px w-screen -translate-x-1/2 translate-y-3 bg-szo-black/30" />

            <DialogPrimitive.Content
              data-slot="dialog-content"
              className={cn(
                "relative z-50 m-auto gap-4 bg-szo-bg p-6 outline-none duration-200",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                className
              )}
              {...props}
            >
              {children}
              {showCloseButton && (
                <DialogPrimitive.Close
                  data-slot="dialog-close"
                  className={cn(
                    "absolute top-4 right-4 text-szo-primary opacity-70 transition-opacity hover:opacity-100",
                    "focus:outline-none focus:ring-2 focus:ring-szo-primary focus:ring-offset-2",
                    "disabled:pointer-events-none",
                    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
                  )}
                >
                  <XIcon className="size-7" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </DialogPrimitive.Content>
          </div>
        </div>
      </DialogOverlay>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-2 border-b border-ui-border pb-4",
        className
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-mono text-[18px] leading-[150%] font-light md:text-[20px]",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
