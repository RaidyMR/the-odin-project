import reverseString from "../scripts/reverseString";

test("takes a string and returns it reversed", () => {
    expect(reverseString("ivo")).toBe("ovi");
});