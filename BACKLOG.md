# Backlog

Small fixes and ideas that are agreed but not done yet.

## A saved story is also a read story  *(on hold until the logo is chosen)*

Today a story counts as read when its comprehension check is completed, or when it is liked after reading
(`markRead` and `like` in `src/lib/state.ts`). Stories saved before the `read` list existed, or saved and later
un-saved, are not counted, so "stories read" can be lower than "stories saved".

Fix: treat every saved story as read, e.g. count `new Set([...state.saved, ...state.read]).size` for the
"stories read" box (`src/components/ReadTab.tsx`) and add a unit test for the old-data case.
