import caesarCipher from "../scripts/caesarCipher";

test("returns a variable in caesar cipher", () => {
    expect(caesarCipher("Zorro.o", 3)).toBe("CRUUR.R");
});