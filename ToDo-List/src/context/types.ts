export type ToDoType = {
    id : number
    title : string
    completed : boolean
}

export type ContextType = {
    todos : ToDoType[]
    filter : FilterType
    onRemove : (id : number) => void
    onAdd : (title : string) => void
    onComplete : (id : number) => void
    onFilterChange : (filter : FilterType) => void
}

export type FilterType = 'all' | 'active' | 'completed'