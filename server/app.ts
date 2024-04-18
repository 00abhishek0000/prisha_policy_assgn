import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {createExpressMiddleware} from '@trpc/server/adapters/express'
import {initTRPC} from "@trpc/server"
import cors from "cors"
import multer from 'multer'
import {z} from 'zod'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

dotenv.config();
const t = initTRPC.create()

const upload = multer({ dest: 'uploads/' });


const appRouter =
t.router({
    home: t.procedure.query(()=>{
        return "hello from home page"
    }),

    addBook: t.procedure.input(z.object({name:z.string(),author:z.string(),details:z.string(),readTime:z.number(),pdf:z.string(),cover:z.string()}))
    .mutation((inp)=>{
        const {input} = inp;
        console.log(input.pdf);
        // add the data received into the database for persistence
        async function createRecord() {
            try {
              const newRecord = await prisma.books.create({
                data: {
                  name: input.name,
                  author: input.author,
                  details: input.details,
                  readTime: input.readTime,
                  cover: input.cover,
                  pdf: input.pdf,
                },
              });
              console.log('Created new record:', newRecord);
            } catch (error) {
              console.error('Error creating record:', error);
            } finally {
              await prisma.$disconnect();
            }
          }
          createRecord();
        return true;
    }),

    getBooks: t.procedure.query(async()=>{
        const specificColumns = await prisma.books.findMany({
            select: {
              name: true,
              author: true,
              cover: true,
              pdf: true,
              readTime: true,
              details: true,
            }
          });
        console.log(specificColumns);
        return specificColumns;
    }),

    rateBook: t.procedure.input(z.object({name: z.string(),rating:z.number()}))
    .mutation((inp)=>{
        const {input} =  inp;
        async function createRecord() {
            try {
            const updatedRecords = await prisma.books.updateMany({
                where: {
                    name: input.name
                },
                data: {
                    rating: input.rating
                }
                });
              console.log('Updated rating:', updatedRecords);
            } catch (error) {
              console.error('Error updating record:', error);
            } finally {
              await prisma.$disconnect();
            }
          }
          createRecord();
        return true;
    }),
})

const app = express();
app.use(cors())
app.use('/trpc',createExpressMiddleware({router:appRouter}))

// app.post('/upload', upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), (req, res) => {
//     // Files are uploaded, you can handle them here
//     // Access them via req.files['cover'][0] and req.files['pdf'][0]
//     res.sendStatus(200);
//   });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export const trpcRouter = appRouter;
export type AppRouter = typeof appRouter;