type ParseResponse = {
    text: string
    warnings: string[]
}

export function parse(template: string, variables: Record<string, any>): ParseResponse {
    return {
        text: template ?? "",
        warnings: [],
    }
}
