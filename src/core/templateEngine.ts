type ParseResponse = {
    text: string
    warnings: string[]
}

export function parse(template: string, variables: Record<string, any>): ParseResponse {

    const warnings = []
    let parsedText = template ?? ""

    if (variables && Object.keys(variables).length > 0) {
        Object.keys(variables).forEach(variableKey => {
            const templateVariable = `\$\{${variableKey}\}`
            const variableValue = variables[variableKey] ?? ""

            parsedText = parsedText.replace(templateVariable, variableValue)
        })
    }

    return {
        text: parsedText,
        warnings,
    }
}
