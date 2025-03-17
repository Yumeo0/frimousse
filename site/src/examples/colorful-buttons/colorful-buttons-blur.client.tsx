"use client";

import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { Emoji as EmojiObject } from "frimousse";
import { type ComponentProps, type PointerEvent, useCallback } from "react";
import { ExamplePreview } from "../example-preview";

interface ListProps extends ComponentProps<"div"> {
  rows: number;
  columns: number;
}

interface RowProps extends ComponentProps<"div"> {
  index: number;
}

interface EmojiProps extends ComponentProps<"button"> {
  emoji: EmojiObject;
  index: number;
}

function List({ rows, columns, children, ...props }: ListProps) {
  const clearActiveEmojis = useCallback(() => {
    const emojis = Array.from(document.querySelectorAll("[frimousse-emoji]"));

    for (const emoji of emojis) {
      emoji.removeAttribute("data-active");
    }
  }, []);

  const setActiveEmoji = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      clearActiveEmojis();

      const emoji = document.elementFromPoint(event.clientX, event.clientY);

      if (emoji?.hasAttribute("frimousse-emoji")) {
        emoji.setAttribute("data-active", "");
      }
    },
    [clearActiveEmojis],
  );

  return (
    <div
      aria-colcount={columns}
      aria-rowcount={rows}
      frimousse-list=""
      role="grid"
      {...props}
      onPointerCancel={clearActiveEmojis}
      onPointerDown={setActiveEmoji}
      onPointerLeave={clearActiveEmojis}
      onPointerMove={setActiveEmoji}
    >
      {children}
    </div>
  );
}

function Row({ index, style, children, ...props }: RowProps) {
  return (
    <div
      aria-rowindex={index}
      frimousse-row=""
      role="row"
      style={{
        contain: "content",
        display: "flex",
        ...style,
      }}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
}

function Emoji({
  emoji,
  index,
  style,
  children,
  className,
  ...props
}: EmojiProps) {
  return (
    <button
      aria-colindex={index}
      aria-label={emoji.label}
      className={cn(
        "group relative size-12 rounded-[20%] text-2xl outline-none transition duration-200 ease-out",
        "focus-visible:bg-gray-400/10 focus-visible:duration-0 data-[active]:bg-gray-400/10 data-[active]:duration-0 dark:data-[active]:bg-gray-400/20 dark:focus-visible:bg-gray-400/20",
        className,
      )}
      frimousse-emoji=""
      role="gridcell"
      style={{
        fontFamily:
          "'Apple Color Emoji', 'Noto Color Emoji', 'Twemoji Mozilla', 'Android Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', EmojiSymbols, sans-serif",
        ...style,
      }}
      type="button"
      {...props}
      onClick={() => {
        toast(emoji);
      }}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 hidden items-center justify-center overflow-hidden rounded-[inherit] opacity-0 transition-[display,opacity] transition-discrete duration-200 ease-out",
          "group-focus-visible:flex group-focus-visible:opacity-100 group-focus-visible:duration-0 group-data-[active]:flex group-data-[active]:opacity-100 group-data-[active]:duration-0",
        )}
      >
        <span className="text-[2.5em] opacity-20 blur-lg saturate-200">
          {emoji.emoji}
        </span>
      </span>
      <span className="pointer-events-none relative">{emoji.emoji}</span>
    </button>
  );
}

export function ColorfulButtonsBlurPreview() {
  return (
    <ExamplePreview className="relative h-[320px] w-full">
      <List className="w-fit touch-none select-none" columns={4} rows={3}>
        <Row index={0}>
          <Emoji
            emoji={{ emoji: "😊", label: "Smiling face with smiling eyes" }}
            index={0}
          />
          <Emoji emoji={{ emoji: "🎀", label: "Ribbon" }} index={1} />
          <Emoji emoji={{ emoji: "🥑", label: "Avocado" }} index={2} />
          <Emoji emoji={{ emoji: "🌈", label: "Rainbow" }} index={3} />
        </Row>
        <Row index={1}>
          <Emoji emoji={{ emoji: "🖤", label: "Black heart" }} index={0} />
          <Emoji emoji={{ emoji: "❤️", label: "Red heart" }} index={1} />
          <Emoji emoji={{ emoji: "🧡", label: "Orange heart" }} index={2} />
          <Emoji emoji={{ emoji: "💛", label: "Yellow heart" }} index={3} />
        </Row>
        <Row index={2}>
          <Emoji emoji={{ emoji: "🤍", label: "White heart" }} index={0} />
          <Emoji emoji={{ emoji: "💚", label: "Green heart" }} index={1} />
          <Emoji emoji={{ emoji: "💙", label: "Blue heart" }} index={2} />
          <Emoji emoji={{ emoji: "💜", label: "Purple heart" }} index={3} />
        </Row>
      </List>
      <span className="pointer-events-none absolute inset-x-4 bottom-6 select-none truncate text-center text-foreground/50 text-sm">
        Hover or focus to see the effect
      </span>
    </ExamplePreview>
  );
}
