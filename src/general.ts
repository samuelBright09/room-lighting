interface RoomData {
  name: string;
  lightIntensity: number;
  numOfLights: number;
  isLightOn: boolean;
  autoOn: string;
  autoOff: string;
  usage: number[];
  element?: HTMLElement; // Optional DOM reference
}

interface WifiConnection {
  id: number;
  wifiName: string;
  signal: string;
}

class General {
  componentsData: { [key: string]: RoomData } = {
    hall: {
      name: "hall",
      lightIntensity: 5,
      numOfLights: 6,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [22, 11, 12, 10, 12, 17, 22],
    },
    bedroom: {
      name: "bedroom",
      lightIntensity: 5,
      numOfLights: 3,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [18, 5, 7, 5, 6, 6, 18],
    },
    bathroom: {
      name: "bathroom",
      lightIntensity: 5,
      numOfLights: 1,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [2, 1, 1, 1, 1, 3, 3],
    },
    "outdoor lights": {
      name: "outdoor lights",
      lightIntensity: 5,
      numOfLights: 6,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [15, 12, 13, 9, 12, 13, 18],
    },
    "guest room": {
      name: "guest room",
      lightIntensity: 5,
      numOfLights: 4,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [12, 10, 3, 9, 5, 5, 18],
    },
    kitchen: {
      name: "kitchen",
      lightIntensity: 5,
      numOfLights: 3,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [12, 19, 13, 11, 12, 13, 18],
    },
    "walkway & corridor": {
      name: "walkway & corridor",
      lightIntensity: 5,
      numOfLights: 8,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [12, 19, 13, 15, 22, 23, 18],
    },
  };

  wifiConnections: WifiConnection[] = [
    { id: 0, wifiName: "Inet service", signal: "excellent" },
    { id: 1, wifiName: "Kojo_kwame121", signal: "poor" },
    { id: 2, wifiName: "spicyalice", signal: "good" },
    { id: 3, wifiName: "virus", signal: "good" },
  ];

  isLightOn: boolean;
  lightIntensity: number;

  constructor() {
    this.isLightOn = false;
    this.lightIntensity = 5;
  }

  getComponent(name: string): RoomData | null {
    if (!name) return null;
    return this.componentsData[name];
  }

  getWifi(): WifiConnection[] {
    return this.wifiConnections;
  }

  getSelectedComponentName(
    element: HTMLElement,
    ancestorIdentifier: string = ".rooms",
    elementSelector: string = "p"
  ): string {
    const selectedElement = this.closestSelector(
      element,
      ancestorIdentifier,
      elementSelector
    ) as HTMLElement | null;

    if (!selectedElement) return "";

    const name = selectedElement.textContent?.toLowerCase() ?? "";
    return name;
  }

  getComponentData(
    element: HTMLElement,
    ancestorIdentifier: string,
    childElement: string
  ): RoomData | undefined {
    const room = this.getSelectedComponentName(
      element,
      ancestorIdentifier,
      childElement
    );

    const data = this.getComponent(room);
    return data ?? undefined;
  }

  renderHTML(
    element: string,
    position: InsertPosition,
    container: Element
  ): void {
    container.insertAdjacentHTML(position, element);
  }

  notification(message: string): string {
    return `
      <div class="notification">
        <p>${message}</p>
      </div>
    `;
  }

  displayNotification(
    message: string,
    position: InsertPosition,
    container: Element
  ): void {
    const html = this.notification(message);
    this.renderHTML(html, position, container);
  }

  removeNotification(element: HTMLElement): void {
    setTimeout(() => {
      element.remove();
    }, 2000);
  }

  selector(identifier: string): Element | null {
    return document.querySelector(identifier);
  }

  closestSelector(
    selectedElement: HTMLElement,
    ancestorIdentifier: string,
    childSelector: string
  ): Element | null {
    const closestAncestor = selectedElement.closest(ancestorIdentifier);
    return closestAncestor
      ? closestAncestor.querySelector(childSelector)
      : null;
  }

  handleLightIntensity(element: HTMLElement, lightIntensity: number): void {
    element.style.filter = `brightness(${lightIntensity})`;
  }

  updateComponentData(data: RoomData): void {
    this.componentsData[data.name] = data;
  }

  updateMarkupValue(element: HTMLElement, value: string | number): void {
    element.textContent = String(value);
  }

  toggleHidden(element: HTMLElement): void {
    element.classList.toggle("hidden");
  }

  removeHidden(element: HTMLElement): void {
    element.classList.remove("hidden");
  }

  addHidden(element: HTMLElement): void {
    element.classList.add("hidden");
  }

  setComponentElement(roomData: RoomData): void {
    let parent: Element | null = null;

    if (roomData.name === "walkway & corridor") {
      parent = this.selector(".corridor");
    } else if (roomData.name === "guest room") {
      const elementClassName = this.formatTextToClassName(roomData.name);
      parent = this.selector(`.${elementClassName}`);
    } else if (roomData.name === "outdoor lights") {
      parent = this.selector(".outside_lights");
    } else {
      parent = this.selector(`.${roomData.name}`);
    }

    const buttonElement = parent?.querySelector(".light-switch") as HTMLElement | null;

    if (roomData.element) return;

    roomData.element = buttonElement || undefined;
  }

  formatTextToClassName(name: string): string {
    return name.split(" ").join("_");
  }
}

export default General;
export { RoomData, WifiConnection };
