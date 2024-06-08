export class UserNotCreatedError extends Error {
    constructor() {
        super("Não foi possivel criar esta conta")
    }
}