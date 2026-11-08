import { useStore } from "../lib/store";
import { Icon } from "./Icon";

/** Star toggle for a grammar pill. Safe to use inside <summary>: it never toggles the accordion. */
export function FavStar({ pillId, title, size = 20 }: { pillId: string; title: string; size?: number }) {
  const { state, dispatch } = useStore();
  const on = state.favPills.includes(pillId);
  return (
    <button
      className={`star${on ? " on" : ""}`}
      aria-pressed={on}
      aria-label={on ? `Remove “${title}” from favorites` : `Add “${title}” to favorites`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: "toggleFavPill", id: pillId });
      }}
    >
      <Icon name="star" size={size} fill={on} />
    </button>
  );
}
