type ParseResponse = {
    text: string
    warnings: string[]
}

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

    const templateVariableRegex = /\$\{([^\}]+)\}/g
    const variablesInTemplate: string[] = template.match(templateVariableRegex) ?? []
    const variablesInDictionary: string[] = []

    if (variables && Object.keys(variables).length > 0) {
        Object.keys(variables).forEach(variableKey => {
            variablesInDictionary.push(generateTemplateVariableFromVariableKey(variableKey))
            const variableValue = recoverVariableValueFromDictionary(variables, variableKey)

            if (variables[variableKey] === null) {
                warnings.push(`Variable ${variableKey} is null`)
            }
            parsedText = parsedText.replaceAll(variablesInDictionary.at(-1) as string, variableValue)
        })
    }

    variablesInDictionary
        .filter(variable => !variablesInTemplate.includes(variable))
        .forEach(variable => {
            warnings.push(`Variable ${extractVariableKeyFromTemplateVariable(variable)} not found in template`)
        });

    (parsedText.match(templateVariableRegex) ?? [])
        .forEach((variable: string) => {
            warnings.push(`Variable ${extractVariableKeyFromTemplateVariable(variable)} not found in dictionary`)
        })

    return {
        text: parsedText,
        warnings,
    }
}
