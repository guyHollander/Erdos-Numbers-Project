import express from 'express';
import {ErdosGraph} from '../erdos_graph/Erdos-Graph.mjs'

const router = express.Router()
const graph = new ErdosGraph()

/* GET home page. */
router.get('/erdosPath', function(req, res, next) {
  res.json(graph.returnErdosSubGraph(null, req.query['name']))
});

export default router
