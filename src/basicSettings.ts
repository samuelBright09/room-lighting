

import General from './general';
import type { RoomData } from './general';

class Light extends General {
  constructor() {
    super();
  }

  override notification(message: string): string {
    return `
      <div class="notification">
        <div>
          <img src="./assets/svgs/checked.svg" alt="checked svg icon on notifications">
        </div>
        <p>${message}</p>
      </div>
    `;
  }

  override displayNotification(message: string, position: InsertPosition, container: Element): void {
    const html = this.notification(message);
    this.renderHTML(html, position, container);
  }

  override removeNotification(element: HTMLElement): void {
    setTimeout(() => {
      element.remove();
    }, 5000);
  }

  lightSwitchOn(lightButtonElement: HTMLElement): void {
    lightButtonElement.setAttribute('src', './assets/svgs/light_bulb.svg');
    lightButtonElement.setAttribute('data-lightOn', './assets/svgs/light_bulb_off.svg');
  }

  lightSwitchOff(lightButtonElement: HTMLElement): void {
    lightButtonElement.setAttribute('src', './assets/svgs/light_bulb_off.svg');
    lightButtonElement.setAttribute('data-lightOn', './assets/svgs/light_bulb.svg');
  }

  lightComponentSelectors(lightButtonElement: HTMLElement): {
    room: string;
    componentData: RoomData | null;
    childElement: HTMLElement | null;
    background: HTMLElement | null;
  } {
    const room = this.getSelectedComponentName(lightButtonElement);
    const componentData = this.getComponent(room);
    const childElement = lightButtonElement.firstElementChild as HTMLElement | null;
    const background = this.closestSelector(lightButtonElement, '.rooms', 'img') as HTMLElement | null;

    return { room, componentData, childElement, background };
  }

  toggleLightSwitch(lightButtonElement: HTMLElement): void {
    const { componentData: component, childElement, background } = this.lightComponentSelectors(lightButtonElement);
    const slider = this.closestSelector(lightButtonElement, '.rooms', '#light_intensity') as HTMLInputElement | null;

    if (!component || !childElement || !background || !slider) return;

    component.isLightOn = !component.isLightOn;

    if (component.isLightOn) {
      this.lightSwitchOn(childElement);
      component.lightIntensity = 5;
      const lightIntensity = component.lightIntensity / 10;
      this.handleLightIntensity(background, lightIntensity);
      slider.value = component.lightIntensity.toString();
    } else {
      this.lightSwitchOff(childElement);
      this.handleLightIntensity(background, 0);
      slider.value = '0';
    }
  }

  handleLightIntensitySlider(element: HTMLElement, intensity: number): void {
    const { componentData: component } = this.lightComponentSelectors(element);
    if (!component || typeof intensity !== 'number' || Number.isNaN(intensity)) return;

    component.lightIntensity = intensity;

    const lightSwitch = this.closestSelector(element, '.rooms', '.light_switch') as HTMLElement | null;

    if (!lightSwitch) return;

    if (intensity === 0) {
      component.isLightOn = false;
      this.sliderLight(component.isLightOn, lightSwitch);
    } else {
      component.isLightOn = true;
      this.sliderLight(component.isLightOn, lightSwitch);
    }
  }

  sliderLight(isLightOn: boolean, lightButtonElement: HTMLElement): void {
    const { componentData: component, childElement, background } = this.lightComponentSelectors(lightButtonElement);

    if (!component || !childElement || !background) return;

    if (isLightOn) {
      this.lightSwitchOn(childElement);
      const lightIntensity = component.lightIntensity / 10;
      this.handleLightIntensity(background, lightIntensity);
    } else {
      this.lightSwitchOff(childElement);
      this.handleLightIntensity(background, 0);
    }
  }
}

export default Light;
