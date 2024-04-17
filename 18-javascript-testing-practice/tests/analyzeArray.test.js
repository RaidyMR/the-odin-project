import analyzeArray from "../scripts/analyzeArray";

test("average", () => {
    expect(analyzeArray([1, 2, 3])).toEqual({
        average: 2,
        min: 1,
        max: 3,
        length: 3,
    });
});
