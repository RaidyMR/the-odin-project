import capitalize from "../scripts/capitalize";

test("takes a string and returns it with the first letter capitalized", () => {
    expect(capitalize("ivo")).toBe("Ivo");
});