import Player from "../assets/scripts/player";

test('human and computer has a name', () => {
    const human = new Player('human');
    const computer = new Player('computer');
    expect(human.name).toBe('human');
    expect(computer.name).toBe('computer');
});

test('makeMove returns a stringified move', () => {
    const human = new Player('human');
    expect(human.makeMove([0, 0])).toEqual([0, 0]);
});

test('makeMove throws an error when the same move is played twice', () => {
    const human = new Player('human');
    human.makeMove([0, 0]);
    expect(() => human.makeMove([0, 0])).toThrow("Can't play the same move twice");
});

test('randomMove make a random move', () => {
    const computer = new Player('computer');
    expect(computer.randomMove()).toEqual(expect.arrayContaining([expect.any(Number), expect.any(Number)]));
});