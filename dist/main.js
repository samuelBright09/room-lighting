// main.ts
// Import classes
import Light from "./basicSettings.js";
import AdvanceSettings from "./advanceSettings.js";
// Select DOM elements
const homepageButton = document.querySelector(".entry_point");
const homepage = document.querySelector("main");
const mainRoomsContainer = document.querySelector(".application_container");
const advanceFeaturesContainer = document.querySelector(".advanced_features_container");
const nav = document.querySelector("nav");
const loader = document.querySelector(".loader_container");
// Instantiate objects
const lightController = new Light();
const advancedSettings = new AdvanceSettings();
// Global variables
let selectedComponent = null;
let isWifiActive = true;
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
    var _a;
    const selectedElement = e.target;
    if (selectedElement.closest(".light_switch")) {
        const lightSwitch = (_a = selectedElement.closest(".basic_settings_buttons")) === null || _a === void 0 ? void 0 : _a.firstElementChild;
        lightController.toggleLightSwitch(lightSwitch);
        return;
    }
    if (selectedElement.closest(".advance_settings_modal")) {
        const advancedSettingsBtn = selectedElement.closest(".advance_settings_modal");
        advancedSettings.modalPopUp(advancedSettingsBtn);
    }
});
// Handle light intensity slider
mainRoomsContainer.addEventListener("change", (e) => {
    const slider = e.target;
    const value = +(slider === null || slider === void 0 ? void 0 : slider.value);
    lightController.handleLightIntensitySlider(slider, value);
});
// Advanced settings modal events
advanceFeaturesContainer.addEventListener("click", (e) => {
    var _a;
    const selectedElement = e.target;
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
    if ((_a = selectedElement.textContent) === null || _a === void 0 ? void 0 : _a.includes("Cancel")) {
        if (selectedElement.matches(".defaultOn-cancel")) {
            advancedSettings.customizationCancelled(selectedElement, ".defaultOn");
        }
        else if (selectedElement.matches(".defaultOff-cancel")) {
            advancedSettings.customizationCancelled(selectedElement, ".defaultOff");
        }
    }
});
