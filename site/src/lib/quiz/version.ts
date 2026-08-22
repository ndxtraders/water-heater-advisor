/**
 * The recommendation engine's version, written onto every quiz_sessions row.
 *
 * Bump this whenever the engine's output could change for the same answers.
 * Sessions store their engine version so a later logic change cannot silently
 * rewrite what was actually recommended at the time, and so old sessions can be
 * replayed against new logic and compared.
 */
export const ENGINE_VERSION = "v1";
