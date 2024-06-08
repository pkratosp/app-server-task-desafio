import { PrismaTaskRepository } from "src/repositories/prisma/prisma-task-repository";
import { CreateNewTaskUseCase } from "src/services/task_use_case/create-new-task-use-case";
import { ImportFIleCSVUseCase } from "src/services/task_use_case/import-file-csv-use-case";

export async function makeImportFIleCSVUseCase() {
    const prismaTaskRepository = new PrismaTaskRepository()
    const createNewTaskUseCase = new CreateNewTaskUseCase(prismaTaskRepository)
    const importFIleCSVUseCase = new ImportFIleCSVUseCase(createNewTaskUseCase);

    return importFIleCSVUseCase;
}