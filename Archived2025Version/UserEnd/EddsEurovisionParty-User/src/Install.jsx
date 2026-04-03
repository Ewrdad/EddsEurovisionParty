/**
 * @function usePWAInstallPrompt
 * @description A custom React Hook that handles prompting the user to install the Progressive Web App (PWA).
 * It listens for the 'beforeinstallprompt' event and stores the event for later use.
 * It also provides a function to trigger the installation prompt.
 * @returns {object} An object containing:
 * - `installPrompt`: The stored 'beforeinstallprompt' event, or null if not available.
 * - `canInstall`: A boolean indicating whether the install prompt can be shown.
 * - `promptToInstall`: A function to trigger the installation prompt.
 * @example
 * function MyComponent() {
 * const { canInstall, promptToInstall } = usePWAInstallPrompt();
 *
 * return (
 * <div>
 * {canInstall && (
 * <button onClick={promptToInstall}>Install App</button>
 * )}
 * </div>
 * );
 * }
 */
import { useState, useEffect } from "react";

const usePWAInstallPrompt = () => {
  /**
   * @state installPromptEvent
   * @description Stores the 'beforeinstallprompt' event received from the browser.
   * This event is triggered when the browser determines that the PWA meets the installability criteria.
   * @type {BeforeInstallPromptEvent | null}
   */
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  /**
   * @state canInstallState
   * @description A boolean indicating whether the PWA can be installed.
   * This is true when the 'beforeinstallprompt' event has been fired and captured.
   * @type {boolean}
   */
  const [canInstallState, setCanInstallState] = useState(false);

  useEffect(() => {
    /**
     * @function handleBeforeInstallPrompt
     * @description Event listener for the 'beforeinstallprompt' event.
     * This event is fired by the browser when the PWA meets the installability criteria.
     * It prevents the default browser install prompt and stores the event for a custom prompt.
     * @param {BeforeInstallPromptEvent} event The 'beforeinstallprompt' event object.
     */
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the browser's default installation prompt
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Store the event so it can be triggered later.
      setInstallPromptEvent(event);
      // Update the state to indicate that the app can be installed.
      setCanInstallState(true);
    };

    // Add the event listener
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  /**
   * @function promptToInstall
   * @description Triggers the browser's installation prompt using the stored 'beforeinstallprompt' event.
   * It can only be called if the 'beforeinstallprompt' event has been received.
   * After the prompt is shown, it logs the user's choice (accepted or dismissed) and sets the stored event to null.
   */
  const promptToInstall = async () => {
    if (!installPromptEvent) {
      console.log(
        "No install prompt event available. Make sure the app is installable."
      );
      return;
    }

    // Show the install prompt.
    installPromptEvent.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = installPromptEvent;

    // Optionally, log the outcome of the prompt
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and it can't be used again directly, so reset it.
    setInstallPromptEvent(null);
    setCanInstallState(false);
  };

  return {
    installPrompt: installPromptEvent,
    canInstall: canInstallState,
    promptToInstall,
  };
};

export default usePWAInstallPrompt;
