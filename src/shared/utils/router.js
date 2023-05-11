import { Router } from 'express';

import bapRoutes from "../../bap/router.js";
import bppRoutes from "../../bpp/router.js";
import lspRoutes from "../../lsp/router.js";
import igmRoutes from "../../igm/router.js"
import rspRoutes from "../../rsp/router.js"

const router = new Router();

router.use(bapRoutes);
router.use(bppRoutes);
router.use(lspRoutes);
router.use(igmRoutes);
router.use(rspRoutes);


export default router;