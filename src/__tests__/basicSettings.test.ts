import Light from '../basicSettings';
import { RoomData } from '../general';

describe('Light class methods', () => {
  let light: Light;
  let roomData: RoomData;

  beforeEach(() => {
    light = new Light();

    roomData = {
      name: 'bedroom',
      lightIntensity: 5,
      numOfLights: 3,
      isLightOn: false,
      autoOn: '06:30',
      autoOff: '22:00',
      usage: [10, 12, 14, 16, 18, 20, 22],
    };

    light.updateComponentData(roomData);
  });

  test('toggleLightSwitch should switch light on/off', () => {
    const button = document.createElement('button');
    button.classList.add('on');

    light.toggleLightSwitch(button);
    expect(button.classList.contains('on')).toBe(false);

    light.toggleLightSwitch(button);
    expect(button.classList.contains('on')).toBe(true);
  });

  test('handleLightIntensitySlider updates brightness style', () => {
    const slider = document.createElement('input');
    const mockParent = document.createElement('div');
    mockParent.classList.add('room');
    mockParent.classList.add('bedroom');
    const roomBox = document.createElement('div');
    roomBox.classList.add('room-box');
    mockParent.appendChild(roomBox);
    slider.closest = jest.fn().mockReturnValue(mockParent);

    light.handleLightIntensitySlider(slider, 70);
    expect(roomBox.style.filter).toBe('brightness(0.7)');
  });
});
