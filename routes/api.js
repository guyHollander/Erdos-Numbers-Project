import express from 'express';
import {ErdosGraph} from '../erdos_graph/Erdos-Graph.mjs'

const router = express.Router()
const graph = new ErdosGraph('.\\data_set'), graphArxiv = new ErdosGraph('.\\data_set_with_arxiv')

/* GET home page. */
router.get('/erdosPath', function(req, res, next) {
  if(req.query['withArxiv'] === 'true')
    res.json(graphArxiv.returnErdosSubGraph(null, req.query['name']))
  else
    res.json(graph.returnErdosSubGraph(null, req.query['name']))
});

export default router
