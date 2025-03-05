import { Liveblocks as LiveblocksClient } from "@liveblocks/node";
import {
  DEFAULT_REACTIONS,
  ROOM_ID,
  type ReactionsJson,
} from "liveblocks.config";
import { unstable_cacheLife as cachelife } from "next/cache";
import { type ComponentProps, Suspense } from "react";
import {
  Reactions as ClientReactions,
  FallbackReactions,
  ReactionsList,
} from "./reactions.client";

const liveblocks = new LiveblocksClient({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

async function ServerReactions() {
  "use cache";

  cachelife("seconds");

  let reactions: ReactionsJson;

  try {
    reactions = (await liveblocks.getStorageDocument(ROOM_ID, "json"))
      .reactions;
  } catch {
    reactions = DEFAULT_REACTIONS;
  }

  if (!reactions || Object.keys(reactions).length === 0) {
    reactions = DEFAULT_REACTIONS;
  }

  return <ClientReactions roomId={ROOM_ID} serverReactions={reactions} />;
}

export function Reactions(props: Omit<ComponentProps<"div">, "children">) {
  return (
    <ReactionsList {...props}>
      <Suspense fallback={<FallbackReactions />}>
        <ServerReactions />
      </Suspense>
    </ReactionsList>
  );
}
