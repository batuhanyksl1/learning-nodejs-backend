import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject) =>
  (req: Request, _: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
      // schema'ya göre hata alırsa o zaman buradad akış kırılır
      // parse() ZodError fırlatır (throw)
      // Express otomatik error handler’a gider
    });
    next();
  };



  // Zod hatasını yakalamaz. Sadece doğrular