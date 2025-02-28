"use client";

import { cn } from "@/lib/utils";
import {
  EmojiPicker as EmojiPickerPrimitive,
  type EmojiPickerRootProps,
} from "frimousse";
import { FrownIcon, LoaderCircleIcon } from "lucide-react";

interface EmojiPickerProps extends EmojiPickerRootProps {
  autoFocus?: boolean;
}

function EmojiPicker({ className, autoFocus, ...props }: EmojiPickerProps) {
  return (
    <EmojiPickerPrimitive.Root
      className={cn("w-fit rounded-md border bg-background", className)}
      {...props}
    >
      <EmojiPickerPrimitive.Search
        autoFocus={autoFocus}
        className="w-full p-2 text-sm outline-hidden placeholder:text-muted-foreground"
      />
      <EmojiPickerPrimitive.Viewport className="h-[320px] outline-hidden">
        <EmojiPickerPrimitive.Loading>
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <LoaderCircleIcon className="size-6 animate-spin" />
            <span>Loading…</span>
          </div>
        </EmojiPickerPrimitive.Loading>
        <EmojiPickerPrimitive.Empty>
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-secondary-foreground">
            <FrownIcon className="size-5" />
            <span className="text-xs">No emoji found.</span>
          </div>
        </EmojiPickerPrimitive.Empty>
        <EmojiPickerPrimitive.List
          className="select-none pb-1"
          components={{
            Row: ({ children, ...props }) => (
              <div {...props} className="scroll-mb-1 px-1">
                {children}
              </div>
            ),
            Emoji: ({ emoji, isActive, ...props }) => (
              <button
                {...props}
                aria-label={emoji.label}
                className="flex size-7 items-center justify-center whitespace-nowrap rounded-md transition duration-100 data-[active]:bg-muted data-[active]:duration-0"
              >
                {emoji.emoji}
              </button>
            ),
            CategoryHeader: ({ category, ...props }) => (
              <div
                {...props}
                className="bg-background px-2 pt-2 pb-1.25 font-semibold text-secondary-foreground text-xs uppercase"
              >
                {category.label}
              </div>
            ),
          }}
        />
      </EmojiPickerPrimitive.Viewport>
      <div className="flex w-full min-w-0 flex-1 gap-1 border-t p-2">
        <EmojiPickerPrimitive.ActiveEmoji>
          {({ emoji }) => (
            <>
              <div className="flex size-8 items-center justify-center text-2xl">
                {emoji?.emoji}
              </div>
              <div className="flex w-0 min-w-0 flex-1 flex-col justify-center text-xs">
                <span className="truncate font-medium">{emoji?.label}</span>
              </div>
            </>
          )}
        </EmojiPickerPrimitive.ActiveEmoji>
        <EmojiPickerPrimitive.SkinToneSelector
          className="size-8 text-2xl"
          emoji="👋"
        />
      </div>
    </EmojiPickerPrimitive.Root>
  );
}

export { EmojiPicker };
