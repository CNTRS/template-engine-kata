import { describe, it, expect } from "vitest"
import { parse } from "../core/templateEngine"

describe("template engine", () => {
    it("parses template without variables", () => {
        const template = "This is a template without variables."
        const variables = {}
        const result = parse(template, variables)
        expect(result.text).toBe(template)
    })
    it("parses template with one variable", () => {
        const template = "This is a template with one ${variable}"
        const variables = { variable: "value" }
        const result = parse(template, variables)
        expect(result.text).toBe("This is a template with one value")
    })
    it("parses template with multiple variables", () => {
        const template = "This is a template with one ${variable} and another ${anotherVariable}."
        const variables = { variable: "value", anotherVariable: "anotherValue" }
        const result = parse(template, variables)
        expect(result.text).toBe("This is a template with one value and another anotherValue.")
    })
    it.skip("parses template with no matching variables", () => {
        const template = "This is a template with no matching variables."
        const variables = { variable: "value" }
        const result = parse(template, variables)
        expect(result.text).toBe("This is a template with no matching variables.")
    })
    it.skip("parses template with empty string", () => {
        const template = ""
        const variables = {}
        const result = parse(template, variables)
        expect(result.text).toBe("")
    })
    it.skip("parses template with variable as empty string", () => {
        const template = "This is a template with a variable: ${variable}"
        const variables = { variable: "" }
        const result = parse(template, variables)
        expect(result.text).toBe("This is a template with a variable: ")
    })
    it.skip("parses template with variable as null", () => {
        const template = "This is a template with a variable: ${variable}"
        const variables = { variable: null }
        const result = parse(template, variables)
        expect(result.text).toBe("This is a template with a variable: null")
        expect(result.warnings[0]).toBe("Variable variable is null")
    })
    it.skip("warns about variable value not found", () => {
        const template = "This is a template with a variable: ${user}"
        const variables = {}
        const result = parse(template, variables)
        expect(result.text).toBe(template)
        expect(result.warnings[0]).toBe("Variable user not found")
    })
    it.skip("warns about variable not found in template", () => {
        const template = "This is a template with a variable: ${variable}"
        const variables = { user: "value" }
        const result = parse(template, variables)
        expect(result.text).toBe(template)
        expect(result.warnings[0]).toBe("Variable user not found in template")
    })
    it.skip("warns about variable null or empty arguments", () => {
        const template = null
        const variables = null //@ts-ignore
        const result = parse(template, variables)
        expect(result.text).toBe("")
        expect(result.warnings[0]).toBe("Template is null or empty")
        expect(result.warnings[1]).toBe("Variables are null or empty")
    })
})
