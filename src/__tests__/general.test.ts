import General, { RoomData } from "../general";

describe("General Class Methods", () => {
  let general: General;
  let roomData: RoomData;

  beforeEach(() => {
    general = new General();
  });

  test("Should return the correct room data", () => {
    const hall = general.getComponent("hall");
    expect(hall?.name).toBe("hall");
  });

  test('should return null for invalid room', () => {
    const invalid = general.getComponent('garage');
    expect(invalid).toBeNull();
  });

    test('should update room data correctly', () => {
    const updatedData: RoomData = {
      name: 'hall',
      lightIntensity: 10,
      numOfLights: 6,
      isLightOn: true,
      autoOn: "07:00",
      autoOff: "23:00",
      usage: [1, 2, 3, 4, 5, 6, 7],
    };

    general.updateComponentData(updatedData);
    const updated = general.getComponent('hall');
    expect(updated?.lightIntensity).toBe(10);
    expect(updated?.isLightOn).toBe(true);
  });

    test('formatTextToClassName should convert spaces to underscores', () => {
    const formatted = general.formatTextToClassName('guest room');
    expect(formatted).toBe('guest_room');
  });

});
