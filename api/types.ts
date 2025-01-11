export interface Item {
    readonly description: string
    readonly delivered: boolean
}

export function item(description: string) {
    return {
        description,
        delivered: false,
    }
}

export interface Job {
    readonly id: string
    readonly created: Date
    readonly updated: Date

    readonly status: 'Waiting' | 'Transit' | 'Completed'

    readonly sender: Contact
    readonly receiver: Contact
    readonly courier: Contact

    readonly origin: Location
    readonly destination: Location

    readonly items: Item[]
}

export interface Contact {
    readonly name: string
    readonly phone: string
    readonly email: string
}

export interface Location {
    readonly address: string
}
