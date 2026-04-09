/**
 * neonAuth.ts - LOCAL-ONLY STUB
 *
 * Cloud authentication has been stripped for local-only operation.
 * All exported functions return "not configured" or no-ops to
 * prevent crashes in components that reference them.
 */

import logger from "../utils/logger";

export const NEON_AUTH_URL = "";
export const authClient = null;

export type SocialProvider = "google";

export function updateLastSignInTime(): void {
  // no-op: local-only mode
}

export function isWithinGracePeriod(): boolean {
  return false;
}

export async function deleteAccount(): Promise<{ error?: Error }> {
  return { error: new Error("Cloud accounts disabled in local-only mode") };
}

export async function signOut(): Promise<void> {
  logger.info("signOut called but cloud auth is disabled (local-only mode)", {}, "auth");
}

export async function withSessionRefresh<T>(operation: () => Promise<T>): Promise<T> {
  // No session to refresh in local mode — just run the operation directly
  return operation();
}

export async function signInWithSocial(
  _provider: SocialProvider
): Promise<{ error?: Error }> {
  return { error: new Error("Cloud sign-in disabled in local-only mode") };
}

export async function requestPasswordReset(
  _email: string
): Promise<{ error?: Error }> {
  return { error: new Error("Cloud auth disabled in local-only mode") };
}

export async function resetPassword(
  _newPassword: string,
  _token: string
): Promise<{ error?: Error }> {
  return { error: new Error("Cloud auth disabled in local-only mode") };
}
