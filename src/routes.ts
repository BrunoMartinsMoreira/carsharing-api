import { Request, Response } from "express";
import createCourseService from "./CreateCourseService";

export function createCourse(req: Request, res: Response){
 const course =  createCourseService.execute('Node', 46, 'Leo');
 return res.json(course);
}