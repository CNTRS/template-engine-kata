type ParseResponse = {
    text: string
    warnings: string[]
}

function getVariableValue(variables: Record<string, any>, variableKey: string): string {
    if (variables[variableKey] === null) return "null"
    return variables[variableKey] ?? ""
}

export function parse(template: string, variables: Record<string, any>): ParseResponse {

    const warnings = []
    let parsedText = template ?? ""

    if (template == null || template === "") {
        parsedText = ""
        warnings.push("Template is null or empty")
    }

    if (variables == null) {
        warnings.push("Variables are null or empty")
    }

    if (variables && Object.keys(variables).length > 0) {
        Object.keys(variables).forEach(variableKey => {
            const templateVariable = `\$\{${variableKey}\}`
            const variableValue = getVariableValue(variables, variableKey)

            if (variables[variableKey] === null) {
                warnings.push(`Variable ${variableKey} is null`)
            }

            if (!parsedText.includes(templateVariable)) {
                warnings.push(`Variable ${variableKey} not found in template`)
            }
            parsedText = parsedText.replace(templateVariable, variableValue)
        })
    }

    return {
        text: parsedText,
        warnings,
    }
}
