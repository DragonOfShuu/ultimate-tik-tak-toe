import { expect, test } from "vitest";
import { nextPlayer } from "../../../contexts/gameManager";

test("Next player cycles player", () => {
    expect.soft(nextPlayer(2, 1)).toBe(0);
    expect.soft(nextPlayer(2, 0)).toBe(1);
});
