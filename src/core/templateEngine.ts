type ParseResponse = {
    text: string
    warnings: string[]
}

const templateVariableRegex = /\$\{([^\}]+)\}/g

function recoverVariableValueFromDictionary(variables: Record<string, any>, variableKey: string): string {
    if (variables[variableKey] === null) return "null"
    return variables[variableKey] ?? ""
}

function extractVariableKeyFromTemplateVariable(templateVariable: string): string {
    return templateVariable.match(/[^\}\{\$}]+/)?.[0] ?? ""
}

function generateTemplateVariableFromVariableKey(variableKey: string): string {
    return `\$\{${variableKey}\}`
}

function generateVariablesWarnings(template: string, variables: Record<string, any>) {
    const warnings: string[] = []
    const variableKeys = Object.keys(variables)

    variableKeys
        .filter(variableKey => variables[variableKey] === null)
        .forEach(variableKey => {
            warnings.push(`Variable ${variableKey} is null`)
        })

    variableKeys
        .filter(variableKey => !template.includes(generateTemplateVariableFromVariableKey(variableKey)))
        .forEach(variableKey => {
            warnings.push(`Variable ${variableKey} not found in template`)
        })

    return warnings
}

function generateParserWarnings(parsedText: string) {
    const warnings: string[] = [];
    (parsedText.match(templateVariableRegex) ?? [])
        .forEach((variable: string) => {
            warnings.push(`Variable ${extractVariableKeyFromTemplateVariable(variable)} not found in dictionary`)
        })

    return warnings
}

function parseWithInvalidTemplateOrVariables(template: string, variables: Record<string, any>) {
    const warnings: string[] = []
    let parsedText = template ?? ""
    if (template == null || template === "") {
        parsedText = ""
        warnings.push("Template is null or empty")
    }

    if (variables == null) {
        warnings.push("Variables are null or empty")
    }

    return {
        text: parsedText,
        warnings
    }
}

export function parse(template: string, variables: Record<string, any>): ParseResponse {

    const warnings: string[] = []
    let parsedText = template ?? ""

    if (template == null || template === "" || variables == null) {
        return parseWithInvalidTemplateOrVariables(template, variables)
    }

    if (variables && Object.keys(variables).length > 0) {
        Object.keys(variables).forEach(variableKey => {
            const variableValue = recoverVariableValueFromDictionary(variables, variableKey)
            parsedText = parsedText.replaceAll(generateTemplateVariableFromVariableKey(variableKey), variableValue)
        })
    }

    warnings.push(...generateVariablesWarnings(template, variables))
    warnings.push(...generateParserWarnings(parsedText))

    return {
        text: parsedText,
        warnings,
    }
}
