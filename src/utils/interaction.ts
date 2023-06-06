export function createId(namespace: string, ...args: unknown[]): string {
    console.log(namespace, args)
    return `${namespace};${args.join(';')}`
}

export function readId(id: string): [namespace: string, ...args: string[]] {
    console.log(id)
    const [namespace, ...args] = id.split(';')
    console.log(namespace, args)
    return [namespace, ...args]
}

export function createIdWithUserName(namespace: string, ...args: unknown[]): string {
    return `${namespace};${args.join(';')}`
}

export function readIdWithUserName(id: string): [namespace: string, ...args: string[]] {
    const [namespace, ...args] = id.split(';')
    return [namespace, ...args]
}