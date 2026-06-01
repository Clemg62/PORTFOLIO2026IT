import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

const validate = (schema: ZodObject<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: 'fail',
        errors: error.issues.map((e) => ({
            field: e.path[1] || e.path[0],
            message: e.message 
        }))
      });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default validate;