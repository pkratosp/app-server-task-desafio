import fs from 'node:fs'
import { pipeline } from "node:stream"
import util from "node:util"
import { parse } from "csv-parse"

import { CreateNewTaskUseCase } from './create-new-task-use-case';
import { MultipartFile } from "@fastify/multipart";

type fileType = MultipartFile['file']

type RequestType = {
    file: fileType
    filename: string
    userId: string
}

export class ImportFIleCSVUseCase {
    constructor(private createNewTaskUseCase: CreateNewTaskUseCase) {}

    async execute({ file,filename, userId }:RequestType) {

        const filePath = new URL(`../../uploads/${filename}`, import.meta.url)

        const pump = util.promisify(pipeline)
        await pump(file, fs.createWriteStream(filePath))
            

        const streamFile = fs.createReadStream(filePath)

        const csvParse = parse({
            delimiter: ";",
            skipEmptyLines: true,
            fromLine: 2
        })

        const linesParse = streamFile.pipe(csvParse)

        for await (const line of linesParse) {
            const [title, description] = line;

            await this.createNewTaskUseCase.execute({
                description: description,
                title: title,
                userId: userId
            })
        }

     

        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }

        return 'ok'
    }
}