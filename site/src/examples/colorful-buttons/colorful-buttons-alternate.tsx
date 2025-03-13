"use client";

import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { Emoji as EmojiObject } from "frimousse";
import { type ComponentProps, type PointerEvent, useCallback } from "react";

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

function Row({ index, style, className, children, ...props }: RowProps) {
  return (
    <div
      aria-rowindex={index}
      className={cn("group", className)}
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
  className,
  children,
  ...props
}: EmojiProps) {
  return (
    <button
      aria-colindex={index}
      aria-label={emoji.label}
      className={cn(
        "group relative size-12 rounded-[20%] text-2xl outline-none transition duration-200 ease-out",
        "focus-visible:bg-(--color) focus-visible:duration-0 data-[active]:bg-(--color) data-[active]:duration-0",
        "[--color-red:--alpha(var(--color-rose-500)/12%)] dark:[--color-red:--alpha(var(--color-rose-400)/26%)]",
        "[--color-green:--alpha(var(--color-lime-500)/18%)] dark:[--color-green:--alpha(var(--color-lime-400)/28%)]",
        "[--color-blue:--alpha(var(--color-sky-500)/12%)] dark:[--color-blue:--alpha(var(--color-sky-400)/22%)]",
        "group-odd:nth-[3n+1]:[--color:var(--color-red)] group-even:nth-[3n+2]:[--color:var(--color-red)]",
        "group-odd:nth-[3n+2]:[--color:var(--color-green)] group-even:nth-[3n+3]:[--color:var(--color-green)]",
        "group-odd:nth-[3n+3]:[--color:var(--color-blue)] group-even:nth-[3n+1]:[--color:var(--color-blue)]",
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
        toast(emoji.emoji, emoji.label);
      }}
    >
      {emoji.emoji}
    </button>
  );
}

export function ColorfulButtonsAlternate({
  className,
  ...props
}: Omit<ComponentProps<"figure">, "children">) {
  return (
    <figure
      className={cn(
        "not-prose relative flex h-[320px] items-center justify-center rounded-lg border border-dotted bg-background py-14",
        className,
      )}
      {...props}
    >
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
    </figure>
  );
}
