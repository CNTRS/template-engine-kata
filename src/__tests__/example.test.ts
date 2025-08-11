import { describe, expect, it } from "vitest"
import { add, greet } from "../index"

describe("greet function", () => {
    it("should greet a person by name", () => {
        expect(greet("World")).toBe("Hello, World!")
    })

    it("should handle empty string", () => {
        expect(greet("")).toBe("Hello, !")
    })
})

describe("add function", () => {
    it("should add two numbers correctly", () => {
        expect(add(2, 3)).toBe(5)
    })

    it("should handle negative numbers", () => {
        expect(add(-1, 1)).toBe(0)
    })

    it("should handle zero", () => {
        expect(add(0, 0)).toBe(0)
    })
})
