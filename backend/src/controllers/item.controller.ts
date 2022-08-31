import { Request, Response } from 'express';
import axios from 'axios';
import dbModels from "../models";
import { Op } from "sequelize"
const Item = dbModels.item;

export const create = (req: Request, res: Response) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const item = {
    title: req.body.title,
    image: req.body.image
  };

  Item.create(item)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};

export const findAll = (req: Request, res: Response) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : undefined;
    Item.findAll({ where: condition })
    .then((data: any) => {
        res.send(data);
    })
    .catch((err: Error) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

export const refreshAll = async (req: Request, res: Response) => {
    let urlArray: string[] = [];
    for (let index = 1; index <= 25; index++) {
        let url = `https://www.sreality.cz/api/en/v2/estates?category_main_cb=1&category_type_cb=1&page=${index}&per_page=20&tms=1661867796703`
        urlArray.push(url)
    }
    
    const requests = urlArray.map(url => axios.get(url))
    const results = await Promise.all(requests)
    let nums: number;
    try {
        nums = await Item.destroy({
            where: {},
            truncate: false
        })
    } catch (err: any) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all items."
        });
        return;
    }
    console.log(`${nums} Items were deleted successfully!`);

    try { 
        await Promise.all(results.map(result => result.data._embedded.estates.map(async (estate: any) => {
            const item = {
                title: estate.name,
                image: estate._links.images[0].href
            }
            
            await Item.create(item)
        })).flat())
    } catch (err: any) {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Item."
        });
        return;
    }

    res.send({ message: "complete" }).end();
};

export const deleteAll = (req: Request, res: Response) => {
    Item.destroy({
        where: {},
        truncate: false
    })
    .then((nums: Number) => {
        res.send({ message: `${nums} Items were deleted successfully!` });
    })
    .catch((err: Error ) => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all items."
        });
    });
};
