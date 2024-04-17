import calc from "../scripts/calculator";

test("adds two numbers", () => {
    expect(calc.add(1, 2)).toBe(3);
});

test("subtracts two numbers", () => {
    expect(calc.subtract(2, 1)).toBe(1);
});

test("divides two numbers", () => {
    expect(calc.divide(4, 2)).toBe(2);
});

test("multiplies two numbers", () => {
    expect(calc.multiply(1, 2)).toBe(2);
});