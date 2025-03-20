import { formatDate, isFutureDate, isNotValidDate } from "./date";

describe("Date Utils", () => {
  describe("formatDate", () => {
    it("should format date string to US format", () => {
      // Arrange
      const date = "2024-03-20T12:00:00.000Z";

      // Act
      const result = formatDate(date);

      // Assert
      expect(result).toBe("March 20, 2024");
    });

    it("should handle different date formats", () => {
      const dates = {
        "2024-03-20T12:00:00.000Z": "March 20, 2024",
        "2024-03-20T00:00:00.000Z": "March 20, 2024",
        "2024-03-20": "March 20, 2024",
      };

      Object.entries(dates).forEach(([input, expected]) => {
        const result = formatDate(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("isFutureDate", () => {
    beforeEach(() => {
      // Mock current date to 2024-03-20
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2024-03-20"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should return true for future dates", () => {
      // Arrange
      const futureDate = "2060-12-25";

      // Act
      const result = isFutureDate(futureDate);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for past dates", () => {
      // Arrange
      const pastDate = "2024-01-01";

      // Act
      const result = isFutureDate(pastDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for current date", () => {
      // Arrange
      const currentDate = "2024-03-20";

      // Act
      const result = isFutureDate(currentDate);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("isNotValidDate", () => {
    it("should return true for invalid dates", () => {
      const invalidDates = [
        "invalid-date",
        "2024-13-45", // Invalid month and day
        "2024/99/99", // Invalid format
        "tomorrow", // Invalid format
        "", // Empty string
        "2023-02-29", // Not a leap year
        "2024-04-31", // April has 30 days
        "2024-06-31", // June has 30 days
        "2024-09-31", // September has 30 days
        "2024-11-31", // November has 30 days
      ];

      invalidDates.forEach((date) => {
        expect(isNotValidDate(date)).toBe(true);
      });
    });

    it("should return false for valid dates", () => {
      const validDates = [
        "2024-03-20", // Regular date
        "2024-02-29", // Leap year
        "2024-01-31", // Month with 31 days
        "2024-04-30", // Month with 30 days
        "2024-02-28", // February non-leap year
      ];

      validDates.forEach((date) => {
        expect(isNotValidDate(date)).toBe(false);
      });
    });

    it("should handle edge cases", () => {
      // Test leap years
      expect(isNotValidDate("2024-02-29")).toBe(false); // Valid leap year
      expect(isNotValidDate("2023-02-29")).toBe(true); // Invalid - not a leap year

      // Test month boundaries
      expect(isNotValidDate("2024-04-31")).toBe(true); // April has 30 days
      expect(isNotValidDate("2024-04-30")).toBe(false); // Valid last day of April

      // Test more edge cases
      expect(isNotValidDate("2024-01-31")).toBe(false); // Valid - January has 31 days
      expect(isNotValidDate("2024-02-30")).toBe(true); // Invalid - February never has 30 days
    });
  });
});
