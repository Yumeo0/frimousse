import { useCallback, useDeferredValue, useMemo } from "react";
import { $activeEmoji, sameEmojiPickerEmoji } from "./store";

import { useEmojiPickerStore } from "./store";
import type { Emoji, SkinTone, SkinToneVariation } from "./types";
import { getSkinToneVariations } from "./utils/get-skin-tone-variations";
import { useSelector, useSelectorKey } from "./utils/store";

// biome-ignore lint/correctness/noUnusedImports: This import is only used to create @link tags in JSDoc comments.
import type * as EmojiPicker from "./components/emoji-picker";

/**
 * Returns the currently active emoji (either hovered or selected
 * via keyboard navigation).
 *
 * @example
 * ```tsx
 * const activeEmoji = useActiveEmoji();
 * ```
 *
 * @see
 * If you prefer to use a component rather than a hook,
 * {@link EmojiPicker.ActiveEmoji|`<EmojiPicker.ActiveEmoji />`} is also available.
 */
export function useActiveEmoji(): Emoji | undefined {
  const store = useEmojiPickerStore();
  const activeEmoji = useSelector(store, $activeEmoji, sameEmojiPickerEmoji);

  return useDeferredValue(activeEmoji);
}

/**
 * Returns the current skin tone and a function to change it.
 *
 * @example
 * ```tsx
 * const [skinTone, setSkinTone] = useSkinTone();
 * ```
 *
 * It can also make building a custom skin tone selector easier: pass an emoji
 * you want to use as visual (by default, ✋) and it will return its skin tone
 * variations.
 *
 * @example
 * ```tsx
 * const [skinTone, setSkinTone, skinToneVariations] = useSkinTone("👋");
 *
 * // [👋] [👋🏻] [👋🏼] [👋🏽] [👋🏾] [👋🏿]
 * skinToneVariations.map(({ skinTone, emoji }) => (
 *   <button key={skinTone} onClick={() => setSkinTone(skinTone)}>
 *     {emoji}
 *   </button>
 * ));
 * ```
 *
 * @see
 * If you prefer to use a component rather than a hook,
 * {@link EmojiPicker.SkinTone|`<EmojiPicker.SkinTone />`} is also available.
 *
 * @see
 * An already-built skin tone selector is also available,
 * {@link EmojiPicker.SkinToneSelector|`<EmojiPicker.SkinToneSelector />`}.
 */
export function useSkinTone(
  emoji = "✋",
): [SkinTone, (skinTone: SkinTone) => void, SkinToneVariation[]] {
  const store = useEmojiPickerStore();
  const skinTone = useSelectorKey(store, "skinTone");
  const skinToneVariations = useMemo(
    () => getSkinToneVariations(emoji),
    [emoji],
  );

  const setSkinTone = useCallback((skinTone: SkinTone) => {
    store.set({ skinTone });
  }, []);

  return [skinTone, setSkinTone, skinToneVariations] as const;
}
