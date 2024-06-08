export class RequiredParams extends Error {
    constructor() {
        super("Deve ser definido pelo menos a página para pesquisa")
    }
}