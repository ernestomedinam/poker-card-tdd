const { chooseRandomItem, buildPokerCardObject } = require(".");

describe("chooseRandomItem as a function that returns a random element from an array", () => {
    it("returns one of the numbers in the array", () => {
        const numbers = [1, 0, 9, 43, 12, -56];
        const result = chooseRandomItem(numbers);
        expect(numbers.includes(result)).toBeTruthy();
    });
    it("returns one of the objects in the array", () => {
        const objects = [{a: "some", b: "some"}, {a: "else", b: "else"}];
        const result = chooseRandomItem(objects);
        expect(result.a === "some" || result.a === "else").toBeTruthy();
    });
});

describe("buildPokerCardObject as a function that takes a face value and a suit and returns a poker card object", () => {
    it("returns an object that has a face value and a suit object that has color and label", () => {
        const result = buildPokerCardObject("A", "♦");
        expect(result).toHaveProperty("faceValue", "A");
        expect(result).toHaveProperty("suit.label", "♦");
    });
    it("adds color red to label heart and diamonds, or black to spades and clubs", () => {
        const redCards = [buildPokerCardObject("J", "♥"), buildPokerCardObject("8", "♦")];
        for (const card of redCards) {
            expect(card.suit.color === "red").toBeTruthy();
        }
        const blackCards = [buildPokerCardObject("2", "♠"), buildPokerCardObject("10", "♣")];
        for (const card of blackCards) {
            expect(card.suit.color === "black").toBeTruthy();
        }
    });
});
