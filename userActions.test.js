const { findByLabelText, findByText } = require('@testing-library/dom');
const { default: userEvent } = require('@testing-library/user-event');
const fs = require('fs');
const path = require('path');
jest.dontMock("fs");
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe("tests interface shows right elements for user to interact with", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        require("./index.js");
    });
    afterEach(() => {
        jest.resetModules();
        document.documentElement.innerHTML = "";
    });
    it("has a warning button to redraw", async () => {
        const button = await findByText(document, "Redraw");
        expect(button).toBeInTheDocument();
        expect(button.classList.contains("btn-warning")).toBeTruthy();
    });
});
