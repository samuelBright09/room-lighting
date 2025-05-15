// main.ts

// Import classes
import Light from "./basicSettings";
import AdvanceSettings from "./advanceSettings";

// Select DOM elements
const homepageButton = document.querySelector(
  ".entry_point"
) as HTMLButtonElement;
const homepage = document.querySelector("main") as HTMLElement;
const mainRoomsContainer = document.querySelector(
  ".application_container"
) as HTMLElement;
const advanceFeaturesContainer = document.querySelector(
  ".advanced_features_container"
) as HTMLElement;
const nav = document.querySelector("nav") as HTMLElement;
const loader = document.querySelector(".loader_container") as HTMLElement;

// Instantiate objects
const lightController = new Light();
const advancedSettings = new AdvanceSettings();

// Global variables
let selectedComponent: HTMLElement | null = null;
let isWifiActive: boolean = true;

// Event handlers

// Hide homepage after button click
homepageButton.addEventListener("click", () => {
  lightController.addHidden(homepage);
  lightController.removeHidden(loader);

  setTimeout(() => {
    lightController.removeHidden(mainRoomsContainer);
    lightController.removeHidden(nav);
  }, 1000);
});

// Handle light toggling and advanced settings modal
mainRoomsContainer.addEventListener("click", (e) => {
  const selectedElement = e.target as HTMLElement;

  if (selectedElement.closest(".light_switch")) {
    const lightSwitch = selectedElement.closest(".basic_settings_buttons")
      ?.firstElementChild as HTMLElement;
    lightController.toggleLightSwitch(lightSwitch);
    return;
  }

  if (selectedElement.closest(".advance_settings_modal")) {
    const advancedSettingsBtn = selectedElement.closest(
      ".advance_settings_modal"
    ) as HTMLElement;
    advancedSettings.modalPopUp(advancedSettingsBtn);
  }
});

// Handle light intensity slider
mainRoomsContainer.addEventListener("change", (e) => {
  const slider = e.target as HTMLInputElement;
  const value = +slider?.value;

  lightController.handleLightIntensitySlider(slider, value);
});

// Advanced settings modal events
advanceFeaturesContainer.addEventListener("click", (e) => {
  const selectedElement = e.target as HTMLElement;

  if (selectedElement.closest(".close_btn")) {
    advancedSettings.closeModalPopUp();
  }

  if (selectedElement.closest(".customization_btn")) {
    advancedSettings.displayCustomization(selectedElement);
  }

  if (selectedElement.matches(".defaultOn-okay")) {
    advancedSettings.customizeAutomaticOnPreset(selectedElement);
  }

  if (selectedElement.matches(".defaultOff-okay")) {
    advancedSettings.customizeAutomaticOffPreset(selectedElement);
  }

  if (selectedElement.textContent?.includes("Cancel")) {
    if (selectedElement.matches(".defaultOn-cancel")) {
      advancedSettings.customizationCancelled(selectedElement, ".defaultOn");
    } else if (selectedElement.matches(".defaultOff-cancel")) {
      advancedSettings.customizationCancelled(selectedElement, ".defaultOff");
    }
  }
});

export {};
